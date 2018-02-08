import React from 'react'
import styled from 'styled-components'
import moment from "moment/moment";

const mockedReceipt = {
	"id": "or_1BtHebBqzeANJ3c3Ocb373hI",
	"object": "order",
	"amount": 300,
	"amount_returned": null,
	"application": null,
	"application_fee": null,
	"charge": "ch_1BtHecBqzeANJ3c3iDNUkvw4",
	"created": 1518104981,
	"currency": "usd",
	"customer": null,
	"email": "123@mail.ru",
	"items": [
		{
			"object": "order_item",
			"amount": 200,
			"currency": "usd",
			"description": "Hex Sticker",
			"parent": "sku_4",
			"quantity": 1,
			"type": "sku"
		},
		{
			"object": "order_item",
			"amount": 100,
			"currency": "usd",
			"description": "shipping",
			"parent": "shipping",
			"quantity": 1,
			"type": "sku"
		},
		{
			"object": "order_item",
			"amount": 0,
			"currency": "usd",
			"description": "Taxes (included)",
			"parent": null,
			"quantity": null,
			"type": "tax"
		},
		{
			"object": "order_item",
			"amount": 0,
			"currency": "usd",
			"description": "Free shipping",
			"parent": "ship_free-shipping",
			"quantity": null,
			"type": "shipping"
		}
	],
	"livemode": false,
	"metadata": {},
	"returns": {
		"object": "list",
		"data": [],
		"has_more": false,
		"total_count": 0,
		"url": "/v1/order_returns?order=or_1BtHebBqzeANJ3c3Ocb373hI"
	},
	"selected_shipping_method": "ship_free-shipping",
	"shipping": {
		"address": {
			"city": "123",
			"country": "us",
			"line1": "123",
			"line2": "1232",
			"postal_code": "123",
			"state": "123"
		},
		"carrier": null,
		"name": "123 123",
		"phone": null,
		"tracking_number": null
	},
	"shipping_methods": [
		{
			"id": "ship_free-shipping",
			"amount": 0,
			"currency": "usd",
			"delivery_estimate": null,
			"description": "Free shipping"
		}
	],
	"status": "paid",
	"status_transitions": {
		"canceled": null,
		"fulfiled": null,
		"paid": 1518104983,
		"returned": null
	},
	"updated": 1518104983
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const Dollar = () => <Sign>$</Sign>

const formatMoney = (price) => <span><Dollar />{price}</span>
const formatDate = (date) => moment(date).format('MMMM D, Y')

const renderAddress = ({city='', country='', line1='', line2='', postal_code='', state=''}) => `${city}${country}${line1}${line2}${postal_code}${state}`

const renderProduct = (product, key) =>
	<Product key={key}>
			<Title>{capitalize(product.description)}</Title>
			<Subtotal>{formatMoney(product.amount)}</Subtotal>
	</Product>

const renderProducts = (products) => products.map((p, i) => renderProduct(p, i))

const renderStatus = (statuses) => {
	let status = `Processing`
	let color = '#ccc'

	if (statuses.canceled) {
		status = `Canceled`
		color = "#ED7C60"
	}
	if (statuses.fulfiled) {
		status = `Fulfiled`
		color = "#47CE72"
	}
	if (statuses.paid) {
		status = `Paid`
		color = "#7599DD"
	}
	if (statuses.returned) {
		status = `Returned`
		color = "#FCE279"
	}

	return <StatusValue statusColor={color}>{status}</StatusValue>
}


export default (props = mockedReceipt) =>
	<Container>
		<Heading>
			<In>Receipt</In>
		</Heading>
		<Details>
			<In>
				<Info>
					<Date>{formatDate(mockedReceipt.created)}</Date>
					<Name>{mockedReceipt.shipping.name}</Name>
					<Email>{mockedReceipt.email}</Email>
					<Address>{renderAddress(mockedReceipt.shipping)}</Address>
				</Info>
			</In>

			<Line />

			<In>
				<Products>
					{renderProducts(mockedReceipt.items)}
				</Products>
			</In>

			<Line />

			<In>
				<Total>
						<Status>{renderStatus(mockedReceipt.status_transitions)}</Status>
						<Amount>Total:{' '}{formatMoney(mockedReceipt.amount)}</Amount>
				</Total>
			</In>
		</Details>
	</Container>

const Container = styled.div`
	width: 400px;
	margin: 0px auto;
	background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.07);
`

const Sign = styled.span`font-size: 80%;`

const In = styled.div`padding: 0px 28px;`

const Heading = styled.div`
	text-transform: uppercase;
	text-align: center;
	background: #38383A;
  font-size: 26px;
  padding: 24px 0px;
  color: #ffffff;
  font-weight: 300;
  line-height: 1.1;   
`

const Date = styled.div`
	float: right;
`

const Line = styled.hr`
	margin: 0px;
  border-bottom: 2px dashed #ededed;
`

const Details = styled.div``

const Info = styled.div`
	padding: 24px 0px;
	
	display: flex;
  align-items: center;
  flex-direction: column;
  align-items: flex-end;
`

const Name = styled.div`padding: 0px;margin: 0px;`
const Email = styled.div``
const Address = styled.div``

const Products = styled.div`
	padding: 24px 0px;
`

const Product = styled.div`
	border-bottom: 1px solid #ededed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0px;
`

const Title = styled.div`
	text-align: left;
	flex: 1 0 0;
	max-width: 80%;
  font-size: 18px;
`

const Subtotal = styled.div`
	text-align: right;
	width: 20%;
`

const Total = styled.div`
	padding: 24px 0px;
	display: flex;
	align-items: center;
  justify-content: space-between;
`

const Amount = styled.div`
	> span {
		font-size: 18px;
	}
`
const Status = styled.div`

`

const StatusValue = styled.span`
	font-weight: 600;
	text-transform: uppercase;
	color: ${props => props.statusColor}
`