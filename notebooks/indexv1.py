import boto3
import pandas as pd
import sqlalchemy


def get_blogs_to_update(mysql_conn):
		blogs_df = pd.read_sql("SELECT * from blog where last_indexed is NULL or last_indexed <= Now()", mysql_conn)
    return blogs_df

def get_html_from_s3(blogs_df, s3):
        for row_num in range(blogs_df.shape[0]):
            row = blogs_df.iloc[row_num,:]
            src_file = row['src_file']
             html = html_dict[src_file] 

        

def update_one_blog_in_elastic_search(row, html, elastic_search_conn):
		successful_update = False
	# TODO: extract details about the blog from row and html
    from elasticsearch import Elasticsearch
        client=Elasticsearch('localhost')


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
    # TODO: delete this blog from elastic search if it exists
            es.delete(index='search_v1',doc_type='blog',body='{"query":{"match_all":{}}}')
    # TODO: insert one record with those details into elastic search
            docs = [
    {
        'blog_id':''
        'title':'',
        'author':'',
        'abstract':','
        'date_created':'',
        'publish_date':'',
        'content':''
    }
]
for doc in docs :
    client.create(index='search_v1',doc_type='blog',body=doc)   
    return successful_update

def update_elastic_search(mysql_conn, elastic_search_conn, s3):
		blogs_df = get_blogs_to_update(mysql_conn)
        html_dict = get_html_from_s3(blogs_df, s3)
		return_value = {"errors": 0, "successes": 0}
    for row_num in range(blogs_df.shape[0]):
    		row = blogs_df.iloc[row_num]
        src_file = row['src_file']
        html = html_dict[src_file]
        successful_update = update_one_blog_in_elastic_search(row, html, elastic_search_conn)
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

        template = "mysql+pymysql://{user}:{password}@{host}:{port}/{dbname}"
        connection_string = template.format(user=user, password=password, host=host, port=port, dbname=dbname)
        mysql_conn = sqlalchemy.create_engine(connection_string, pool_size=1)
        df = pd.read_sql("SELECT * from blog order by blog_id desc ", mysql_conn)

       
        s3 = boto3.resource('s3', aws_access_key_id=aws_access_key_id, aws_secret_access_key=aws_secret_access_key)
        bucketName = "dev.dataskeptic.com"
        s3key = src_file
        obj = s3.Object(bucketName, s3key)



        host = 'YOURHOST.us-east-1.es.amazonaws.com'
        awsauth = AWS4Auth(your_access_key, your_secret_key, region, 'es')

        es = elasticsearch.Elasticsearch(
            hosts=[{'host': host, 'port': 443}],
            http_auth=awsauth,
            use_ssl=True,
            verify_certs=True,
            connection_class=elasticsearch.connection.RequestsHttpConnection
        )
        print(es.cluster.health())

    return_value = update_elastic_search(mysql_conn, elastic_search_conn, s3)
    print(return_value)



#########################################################################################
##create more document
es.index(index='posts', doc_type='blog', id=1, body={
    'author': 'Santa Clause',
    'blog': 'Slave Based Shippers of the North',
    'title': 'Using Celery for distributing gift dispatch',
    'topics': ['slave labor', 'elves', 'python',
               'celery', 'antigravity reindeer'],
    'awesomeness': 0.2
})
es.index(index='posts', doc_type='blog', id=2, body={
    'author': 'Benjamin Pollack',
    'blog': 'bitquabit',
    'title': 'Having Fun: Python and Elasticsearch',
    'topics': ['elasticsearch', 'python', 'parseltongue'],
    'awesomeness': 0.7
})
es.index(index='posts', doc_type='blog', id=3, body={
    'author': 'Benjamin Pollack',
    'blog': 'bitquabit',
    'title': 'How to Write Clickbait Titles About Git Being Awful Compared to Mercurial',
    'topics': ['mercurial', 'git', 'flamewars', 'hidden messages'],
    'awesomeness': 0.95
})


# see post 
es.get(index='posts', doc_type='blog', id=2)
# search
es.search(index='posts', q='author:"Benjamin Pollack"')
es.search(index='posts', q='Santa')

# bulk insert
docs = [{'id': 2, 'name': 'Jessica Coder', 'age': 32, 'title': 'Programmer'},
          {'id': 3, 'name': 'Freddy Tester', 'age': 29, 'title': 'Office Assistant'}]
es.bulk((es.index_op(doc, id=doc.pop('id')) for doc in docs),
          index='contacts',
          doc_type='person')