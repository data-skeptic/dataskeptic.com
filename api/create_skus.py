import boto3
import stripe
stripe.api_key = "sk_test_JDu4VvArX2Oa2vh0DOek972y"

def create_sku(id, price, product_id, attributes):
  resp = stripe.SKU.create(
    currency="usd",
    id=id,
    inventory={
      "type": "infinite",
    },
    price=int(price*100),
    product=product_id,
    attributes=attributes
  )
  return resp

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('items')
products = table.scan()['Items']


# Clean database before repopulating
skus = stripe.SKU.list(limit=9999)
for sku in skus['data']:
  sku.delete()

prods = stripe.Product.list(limit=9999)
for prod in prods['data']:
  prod.delete()

plans = stripe.Plan.list(limit=9999)
for plan in plans['data']:
  plan.delete()


sobj = stripe.Product.create(
  name='shipping',
  description='shipping',
  attributes={},
  images=[]
)
resp = create_sku("shipping", 1, sobj['id'], {})


prods = []
for product in products:
  if product['type'] == 'membership':
    stripe.Plan.create(
      amount=int(product['price'] * 100),
      interval="month",
      name=product['title'],
      currency="usd",
      id="sku_" + product['id']
    )
  else:
    attributes = []
    if product.has_key('sizes'):
      attributes = ['size']
    sobj = stripe.Product.create(
      name=product['title'],
      description=product['desc'],
      attributes=attributes,
      images=['http://dataskeptic.com' + product['img']]
    )
    prods.append({'dynamo': product, 'stripe': sobj})


for product in prods:
  price = product['dynamo']['price']
  product_id = product['stripe']['id']
  if product['dynamo'].has_key('sizes'):
    sizes = product['dynamo']['sizes']
  else:
    sizes = ['']
  for size in sizes:
    sku = "sku_" + product['dynamo']['id']
    if size != '':
      sku = sku + "_" + size
    print sku
    attributes = {}
    if size != '':
      attributes = {"size": size}
    resp = create_sku(sku, price, product_id, attributes)
    print(resp)

