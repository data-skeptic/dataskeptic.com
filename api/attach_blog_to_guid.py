import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('blog')

envs = ["", "dev."]
uri = "dataskeptic.com/episodes/2016/ms-connect-conference.md"
guid = "fd9c484eff435ece4da87c3fc3acebe1"

for env in envs:
	u = env + uri
	print(u)
	response = table.update_item(
		Key = {'uri': u},
		UpdateExpression='set guid = :g',
		ExpressionAttributeValues={ ':g': guid},
		ReturnValues="UPDATED_NEW"
	)
	print(response)
