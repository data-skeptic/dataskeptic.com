import boto3
import pandas as pd
import sqlalchemy
from elasticsearch import Elasticsearch
import json

def get_blogs_to_update(mysql_conn):
    blogs_df = pd.read_sql("SELECT * from blog where last_indexed is NULL or last_indexed <= Now()", mysql_conn)
    return blogs_df

def get_html_from_s3(blogs_df, s3, bucketname):
    html_dict = {}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num,:]
        src_file = row['src_file']
        obj = s3.Object(bucketName, src_file)
        html = obj.get()['Body'].read().decode('utf-8')
        html_dict[src_file] = html
    return html_dict

def update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name):
    successful_update = False
    result = elastic_search_conn.delete(index=index_name,doc_type='blog',body='{"query":{"match_all":{}}}')
    print("Need to handle this result", result)
    doc = {
        'blog_id'      : row['blog_id'],
        'title'        : row['title'],
        'author'       : row['author'],
        'abstract'     : row['abstract'],
        'date_created' : row['date_created'],
        'publish_date' : row['publish_date'],
        'content'      : html
    }
    result2 = elastic_search_conn.create(index='search_v1',doc_type='blog',body=doc)   
    return successful_update

def update_elastic_search(mysql_conn, elastic_search_conn, s3):
    blogs_df = get_blogs_to_update(mysql_conn)
    bucketname = bucketname
    index_name = 'search_v1'
    html_dict = get_html_from_s3(blogs_df, s3, bucketname)
    return_value = {"errors": 0, "successes": 0}
    for row_num in range(blogs_df.shape[0]):
        row = blogs_df.iloc[row_num]
        src_file = row['src_file']
        html = html_dict[src_file]
        successful_update = update_one_blog_in_elastic_search(row, html, elastic_search_conn, index_name)
        if successful_update:
            # TODO: update mysql database, set last_indexed = Now()
            update blog set last_indexed = Now()
            return_value['success'] += 1
        else:
            return_value['error'] += 1
    return return_value

if __name__ == '__main__':
    config = json.load(open('git/dataskeptic.com/config/configsql.json', 'r'))
    # TODO: Jing to populate some code from the notebook
    user = config['dev']['mysql']['user']
    password = config['dev']['mysql']['password']
    host = config['dev']['mysql']['host']
    port = config['dev']['mysql']['port']
    dbname = config['dev']['mysql']['dbname']
    aws_access_key_id=config['dev']['aws']['key']
    aws_secret_access_key=config['dev']['aws']['secret']
    bucketname=config['dev']['bucketname']['bucketname']

    template = "mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"
    connection_string = template.format(user=user, password=password, host=host, port=port, dbname=dbname)
    mysql_conn = sqlalchemy.create_engine(connection_string, pool_size=1)
    endpoint = 'https://search-test-vu2fwve5ykzm5tsjkut5q4idum.us-east-1.es.amazonaws.com'
    elastic_search_conn = ElasticSearch(endpoint, port=443)

    s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)

    return_value = update_elastic_search(mysql_conn, elastic_search_conn, s3)
    print(return_value)


