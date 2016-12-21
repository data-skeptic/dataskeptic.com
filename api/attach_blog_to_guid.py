import requests
import xmltodict
import os
import boto3

fname = 'feed.rss'
url = 'http://dataskeptic.com/feed.rss'

r = requests.get(url)

xml = xmltodict.parse(r.content)
episodes = xml['rss']['channel']['item']

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('blog')
blogs = table.scan()
blogs = blogs['Items']

bmap = {}

for blog in blogs:
	pn = blog['prettyname']
	if pn.find('/episodes/') == 0:
		bmap[pn] = blog

envs = ["", "dev."]

for env in envs:
	for episode in episodes:
		link = episode['link']
		if link.find('http://dataskeptic.com/epnotes') == -1:
			x = len('http://dataskeptic.com/blog')
			link = link[x:]
			try:
				blog = bmap[link]
				if not(blog.has_key('guid')):
					guid = episode['guid']['#text']
					uri = blog['uri']
					print("-------------------")
					print([guid, uri])
					response = table.update_item(
						Key = {'uri': uri},
						UpdateExpression='set guid = :g',
						ExpressionAttributeValues={ ':g': guid},
						ReturnValues="UPDATED_NEW"
					)
					print(response)
			except ValueError:
				print('Cannot find blog post for ' + link)



