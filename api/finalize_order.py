import json
import boto3
import uuid
import stripe

stripe.api_key = "sk_test_JDu4VvArX2Oa2vh0DOek972y"

client = boto3.client('ses',
    aws_access_key_id='AKIAJILQN5F7XNMINUDQ',
    aws_secret_access_key='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'
)

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('orders')
    order = event
    order['order_id'] = str(uuid.uuid4())
    cust = order['customer']
    email = cust['email']
    token = order['token']
    products = order['products']
    r1 = table.put_item(Item=order)
    check = r1['ResponseMetadata']['HTTPStatusCode']
    if check != 200:
    	return {"status": "fail", "msg": "Unable to save order, please contact kyle@dataskeptic.com"}
    #
    ########################################################################################
    # Create Stripe customer
    ########################################################################################
    #
	customer = stripe.Customer.create(
	  description="Customer for " + email,
	  source=token
	)
	#
    ########################################################################################
    # Subscribe customer to subscription
    ########################################################################################
    #
	i=0
	items = []
	while i < len(products):
		product = products[i]
		size = ''
		if product.has_key('size'):
			size = product['size'].strip()
		sku = "sku_" + product['product']['id']
		if size != '':
			sku = sku + "_" + size
		if product['product']['type'] == 'membership':
			subscription = stripe.Subscription.create(
				customer=customer['id'],
				plan=sku
			)
			print("Subscription complete:")
			print(subscription)
		else:
			item = {
				"amount": product['product']['price'],
				"currency": "usd",
				"description": product['product']['title'],
				"parent": sku,
				"quantity": product['quan'],
				"type": "sku"
			}
			items.append(item)
		i += 1
	if len(items) > 0:
		item = {
			"amount": 1,
			"currency": "usd",
			"description": "shipping",
			"parent": "shipping",
			"quantity": order['shipping'],
			"type": "sku"
		}
		items.append(item)
	#
    ########################################################################################
    # Order for non-subscription items
    ########################################################################################
    #
	if len(items) > 0:
		sorder = stripe.Order.create(
		  currency='usd',
		  items=items,
		  shipping={
		    "name": cust['first_name'] + ' ' + cust['last_name'],
		    "address":{
		      "line1": cust['street_1'] + ' ' + cust['street_2'],
		      "city": cust['city'],
		      "country": order['country'],
		      "postal_code": cust['zip']
		    },
		  },
		  email=email
		)
		#
		print(sorder)
		process = sorder.pay(
		  source=token
		)
		print(process)
    #
    ########################################################################################
    # Save and report
    ########################################################################################
    # 
    r2 = client.send_email(
        Source='kyle@dataskeptic.com',
        Destination={'ToAddresses': ['kylepolich@gmail.com']},
        Message={
            'Subject': {
                'Data': 'DataSkeptic.com Order from ' + email
            },
            'Body': {
                'Text': {
                    'Data': json.dumps({"order": order, "process": process, "sorder": sorder})
                }
            }
        },
        ReplyToAddresses=['kyle@dataskeptic.com']
    )
    return {"msg": "ok", "msg": ""}