import boto3
import pandas as pd
import sqlalchemy
from elasticsearch import Elasticsearch
import json


def get_blogs_to_update(mysql_conn):
    blogs_df = pd.read_sql("SELECT * from blog where last_rendered > coalesce(last_indexed,'2000-01-01') and publish_date < now()", mysql_conn)
    return blogs_df


def get_html_from_s3(blogs_df, s3, bucketname):
    html_dict = {}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num,:]
        src_file = row['src_file']
        try:
            obj = s3.Object(bucketname, src_file)
            html = obj.get()['Body'].read().decode('utf-8')
        except:
            print("ERROR downloading src_file=" + src_file)
            html = "missing!"
        html_dict[src_file] = html
    return html_dict


def update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name):
    blog_id= int(row['blog_id'])
    doc = {
        'blog_id'      : blog_id,
        'title'        : row['title'],
        'prettyname'   : row['prettyname'],
        'author'       : row['author'],
        'abstract'     : row['abstract'],
        'date_created' : row['date_created'],
        'publish_date' : row['publish_date'],
        'content'      : html
    }
    print("Going to update " + row['title'])
    result2 = elastic_search_conn.index(index_name,'blog', doc, id=blog_id)  
    if result2['_shards']['successful']==1:
        return True
    else:
        return False
    

def update_elastic_search(mysql_conn, elastic_search_conn, s3, index_name):
    blogs_df = get_blogs_to_update(mysql_conn)
    html_dict = get_html_from_s3(blogs_df, s3, bucketname)
    return_value = {"errors": 0, "successes": 0}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num]
        src_file = row['src_file']
        html = html_dict[src_file]
        query='update blog set last_indexed = Now()'
        successful_update = update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name)
        if successful_update:
            blog_id = str(row['blog_id'])
            template = 'update blog set last_indexed = Now() where blog_id = {blog_id}'
            query = template.format(blog_id=blog_id)
            db_result = mysql_conn.execute(query)
            if db_result.rowcount == 1:
                return_value['successes'] += 1
            else:
                print("mysql ERROR")             
                return_value['errors'] += 1
        else:
            return_value['errors'] += 1
            print("elastic search ERROR")
    return return_value


if __name__ == '__main__':
    config = json.load(open('../config/configsql.json', 'r'))
    index_name = 'search_v1'
    user = config['dev']['mysql']['user']
    password = config['dev']['mysql']['password']
    host = config['dev']['mysql']['host']
    port = config['dev']['mysql']['port']
    dbname = config['dev']['mysql']['dbname']
    aws_access_key_id=config['dev']['aws']['key']
    aws_secret_access_key=config['dev']['aws']['secret']
    bucketname=config['dev']['bucketname']['bucketname']
    endpoint = config['dev']['endpoint']
    template = "mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"
    connection_string = template.format(user=user, password=password, host=host, port=port, dbname=dbname)
    mysql_conn = sqlalchemy.create_engine(connection_string, pool_size=1)
    elastic_search_conn = Elasticsearch(endpoint, port=443)
    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
    return_value = update_elastic_search(mysql_conn, elastic_search_conn, s3, index_name)
    print(return_value)

