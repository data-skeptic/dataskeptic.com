from elasticsearch import Elasticsearch
import json
import sqlalchemy
import pandas as pd
import requests
import sys
import time

def get_crawls(mysql_conn):
    query = """
        SELECT location, description
        FROM github_job_crawl_description
        CROSS JOIN github_job_crawl_location
    """
    df = pd.read_sql(query, mysql_conn)
    return df


def get_jobs(mysql_conn, crawls):
    jobs = []
    for r in range(crawls.shape[0]):
        row = crawls.iloc[r]
        description = row['description']
        location = row['location']
        t = "https://jobs.github.com/positions.json?description={description}&location={location}"
        url = t.format(description=description, location=location)
        r = requests.get(url)
        s = r.content.decode('utf-8')
        o = json.loads(s)
        jobs.extend(o)
        time.sleep(1)
    return jobs


if __name__ == '__main__':
    config = json.load(open('../config/config.json', 'r'))
    index_name = 'github_jobs'
    user = config['dev']['mysql']['user']
    password = config['dev']['mysql']['password']
    host = config['dev']['mysql']['host']
    port = config['dev']['mysql']['port']
    dbname = config['dev']['mysql']['dbname']
    endpoint = config['dev']['elastic_search_endpoint']
    template = "mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"
    connection_string = template.format(user=user, password=password, host=host, port=port, dbname=dbname)
    mysql_conn = sqlalchemy.create_engine(connection_string, pool_size=1)
    elastic_search_conn = Elasticsearch(endpoint, port=443)
    #elastic_search_conn.indices.delete(index='github_jobs', ignore=[400, 404])
    crawls = get_crawls(mysql_conn)
    jobs = get_jobs(mysql_conn, crawls)
    for job in jobs:
        ca = pd.to_datetime(job['created_at'])
        job['created_at'] = ca
        result2 = elastic_search_conn.index(index_name, 'jobs', job, id=job['id'])  
        if result2['_shards']['successful']!=1:
            print("Failed to insert")
            sys.exit(-1)
