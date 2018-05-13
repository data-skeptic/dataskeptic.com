import React from 'react'
import styled from 'styled-components'
import moment from 'moment/moment'

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const Dollar = () => <Sign>$</Sign>

const formatMoney = price => (
  <span>
    <Dollar />
    {(price / 100).toFixed(2)}
  </span>
)
const formatDate = date => moment(date * 1000).format('MMMM D, Y')

const renderAddress = ({
  city = '',
  country = '',
  line1 = '',
  line2 = '',
  postal_code = '',
  state = ''
}) =>
  `${line1}${' ' +
    line2}, ${city}, ${country.toUpperCase()}, ${state}, ${postal_code}`

const renderProduct = (product, key) => (
  <Product key={key}>
    <Title>{capitalize(product.description)}</Title>
    <Subtotal>{formatMoney(product.amount)}</Subtotal>
  </Product>
)

const renderProducts = products => products.map((p, i) => renderProduct(p, i))

const renderStatus = statuses => {
  let status = `Processing`
  let color = '#ccc'

  if (statuses.canceled) {
    status = `Canceled`
    color = '#ED7C60'
  }
  if (statuses.fulfiled) {
    status = `Fulfiled`
    color = '#47CE72'
  }
  if (statuses.paid) {
    status = `Paid`
    color = '#7599DD'
  }
  if (statuses.returned) {
    status = `Returned`
    color = '#FCE279'
  }

  return <StatusValue statusColor={color}>{status}</StatusValue>
}

export default props => (
  <Container>
    <Heading>
      <In>Receipt</In>
    </Heading>
    <Details>
      <Line />

      <In>
        <Info>
          <Date>{formatDate(props.created)}</Date>
          <Name>{props.shipping.name}</Name>
          <Email>{props.email}</Email>
          <Address>{renderAddress(props.shipping.address)}</Address>
        </Info>
      </In>
      <Line />

      <In>
        <Products>{renderProducts(props.items)}</Products>
      </In>

      <Line />

      <In>
        <Total>
          <Status>{renderStatus(props.status_transitions)}</Status>
          <Amount>Total: {formatMoney(props.amount)}</Amount>
        </Total>
      </In>
    </Details>
  </Container>
)

const Container = styled.div`
  width: 400px;
  margin: 0px auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07);
`

const Sign = styled.span`
  font-size: 80%;
`

const In = styled.div`
  padding: 0px 28px;
`

// background: #38383A; # default site active color
const Heading = styled.div`
  text-transform: uppercase;
  text-align: center;
  background: #2e1453;
  font-size: 26px;
  padding: 24px 0px;
  color: #ffffff;
  font-weight: 400;
  line-height: 1.1;
  border-radius: 6px 6px 0px 0px;
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

const Name = styled.div`
  padding: 0px;
  margin: 0px;
`
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
const Status = styled.div``

const StatusValue = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.statusColor};
`
