from elasticsearch import Elasticsearch
import json
import requests
from pyelasticsearch.client import ElasticSearch

search_v1={ 
    'mapping':{
        'blog':{
            'properties':{
                'blog_id':{'type':'integer'},
                'title':{'type':'string','analyzer':'english'},
                'author':{'type':'string','index':'not_analyzed'},
                'abstract':{'type':'string','analyzer':'english'},
                'date_created':{'type':'date'},
                'publish_date':{'type':'date'},
                'content':{'type':'string','analyzer':'english'}
            }
        }
    }
}



if __name__ == '__main__':
    config = json.load(open('../config/configsql.json', 'r'))
	# TODO: Jing to populate some code from the notebook
    user = config['dev']['mysql']['user']
    password = config['dev']['mysql']['password']
    host = config['dev']['mysql']['host']
    port = config['dev']['mysql']['port']
    dbname = config['dev']['mysql']['dbname']
    aws_access_key_id=config['dev']['aws']['key']
    aws_secret_access_key=config['dev']['aws']['secret']
    bucketname=config['dev']['bucketname']['bucketname']
    endpoint = 'https://search-test-vu2fwve5ykzm5tsjkut5q4idum.us-east-1.es.amazonaws.com'
    elastic_search_conn = Elasticsearch(endpoint, port=443)
    elastic_search_conn.indices.create(index='search_v1')





es.search(index='search_v1', query={
    "query": {
        "multi_match": {
            "query": "Bayesian Updating",
            "fields": ["title", "abstract"]
        }
    },
    "_source": {
        "includes": [ "blog_id", "title", "prettyname" ]
      }
})



es.search(index='search_v1', query={
    "query": {
        "multi_match": {
            "query": "Bayesian Updating",
            "fields": ["title", "abstract"]
        }
    }
})


es.search(index='search_v1', query={"query": {"multi_match": {"query": "Bayesian","fields": ["title", "abstract"]}}})









