import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'react-router'

const Dollar = () => <Symbol>$</Symbol>

const formatLocation = (location, latitude, longitude) => (
  <Location>
    <i className="glyphicon glyphicon-map-marker" /> {location}
  </Location>
)

const formatStart = start => (
  <Start>
    {moment(start).format('MMMM Do YYYY')}
    {' at '}
    {moment(start).format('h A')}
  </Start>
)

const formatDuration = (start, end) =>
  `${moment.duration(moment(end).diff(start, 'hours'), 'hours').humanize()}`

const formatPrice = (price = 0) => (
  <Price>
    <Dollar />
    <Value>{(+price).toFixed(2)}</Value>
  </Price>
)

export default ({
  url,
  title,
  abstract,
  cost,
  start_time,
  end_time,
  location,
  latitude,
  longitude
}) => (
  <Event to={url}>
    <DateTime>
      {formatLocation(location, latitude, longitude)}
      <Time>{formatStart(start_time)}</Time>
      <Time>{formatDuration(start_time, end_time)}</Time>
    </DateTime>
    <Info>
      <Title>{title}</Title>
      <Abstract>{abstract}</Abstract>
      <Cost>{formatPrice(cost)}</Cost>
    </Info>
  </Event>
)

export const Event = styled(Link)`
  display: flex;
  flex-direction: column;

  border-bottom: 1px solid #e6e6e6;
  padding-top: 2em;
  padding-bottom: 2em;

  &:hover,
  &:focus {
    border-bottom: 1px solid #e6e6e6;
  }
`

export const DateTime = styled.div`
  color: #828382;

  margin-bottom: 2em;
`

export const Info = styled.div``

export const Time = styled.div``

export const Start = styled.span``

export const Title = styled.h4`
  font-size: 22px;
  margin: 0px;
  padding: 0px;
  font-weight: normal;
`

export const Abstract = styled.p`
  margin: 10.5px 0;
`

export const Cost = styled.div`
  color: #2d1454;
  font-weight: bold;
`

export const Price = styled.span``
export const Symbol = styled.span``
export const Value = styled.span``

export const Location = styled.div``
