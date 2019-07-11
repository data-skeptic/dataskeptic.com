import boto3
import pandas as pd
import sqlalchemy
from elasticsearch import Elasticsearch
import json
import requests


def get_blogs_to_update_from_api(api) :
    url = api + "/blog/index/update_to_do"
    print(url)
    r = requests.get(url)
    s = r.content.decode('utf-8')
    o = json.loads(s)
    return pd.DataFrame(o)




def get_db_to_update_from_api(api, blog_id) :
    url = api + "/blog/index/update"
    data = {'blog_id': blog_id}
    r = requests.post(url, json.dumps(data))
    s = r.content.decode('utf-8')
    o = json.loads(s)
    return o


def get_html_from_s3(blogs_df, s3, bucketname):
    html_dict = {}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num,:]
        src_file = row['src_file']
        obj = s3.Object(bucketname, src_file)
        print(bucketname, src_file)
        html = obj.get()['Body'].read().decode('utf-8')
        html_dict[src_file] = html
    return html_dict


def update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name):
    blog_id= int(row['blog_id'])
    doc = {
        'blog_id'      : blog_id,
        'title'        : row['title'],
        'prettyname'   : row['prettyname'],
        'guid'         : row['guid'],
        'author'       : row['author'],
        'abstract'     : row['abstract'],
        'date_created' : row['date_created'],
        'publish_date' : row['publish_date'],
        'content'      : html
    }
    print("Going to update " + row['title'])
    result2 = elastic_search_conn.index(index_name,'blog', doc, id=blog_id)
    if result2['_shards']['failed']==0:
        return True
    else:
        print(len(html))
        print(result2)
        return False
    

def update_elastic_search(api, elastic_search_conn, s3, index_name, bucketname):
    blogs_df = get_blogs_to_update_from_api(api)
    print('blogs:', blogs_df.shape)
    html_dict = get_html_from_s3(blogs_df, s3, bucketname)
    return_value = {"errors": 0, "successes": 0}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num]
        src_file = row['src_file']
        html = html_dict[src_file]
        successful_update = update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name)
        if successful_update:
            blog_id = str(row['blog_id'])
            db_result = get_db_to_update_from_api (api, blog_id)
            print(db_result)
            if db_result['changedRows'] == 1:
                label = 'search_index_update'
                fields = {"blog_id": blog_id}
                observation = {"measurement": label, "tags": [], "fields": fields}
                data = json.dumps(observation)
                #response = requests.post(base_url + '/tse/insert', data=data)
                return_value['successes'] += 1
            else:
                print("api ERROR")             
                return_value['errors'] += 1
        else:
            return_value['errors'] += 1
            print("elastic search ERROR")
    if blogs_df.shape[0] == 0 :
        label = 'search_index_summary'
        observation = {"measurement": label, "tags": [], "fields": return_value}
        data = json.dumps(observation)
        #response = requests.post(base_url + '/tse/insert', data=data)
    return return_value



if __name__ == '__main__':
    config = json.load(open('../config/configsql.json', 'r'))
    index_name = 'search_v1'
    aws_access_key_id=config['dev']['aws']['key']
    aws_secret_access_key=config['dev']['aws']['secret']
    bucketname=config['dev']['bucketname']['bucketname']
    endpoint = config['dev']['endpoint']
    api = config['dev']['api']
    #base_url = config['dev']['base_url']
    elastic_search_conn = Elasticsearch(endpoint, port=443)
    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    return_value = update_elastic_search(api, elastic_search_conn, s3, index_name)
    print(return_value)






    


