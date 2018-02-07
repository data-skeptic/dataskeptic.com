from elasticsearch import Elasticsearch
import json

search_v1={ 
    'mapping':{
        'blog':{
            'properties':{
                'blog_id':{'type':'integer'}
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

client.indice.create(index='search_v1',body=search_v1)

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
