import React, {Component} from 'react'
import styled from 'styled-components'
import {connect } from 'react-redux'
import Container from '../../../components/Container'
import {getUser, logout} from '../../../redux/modules/auth'
import { redirect } from '../../../util'

const renderSubscription = (subscription) =>
    subscription
        ? <On>on</On>
        : <Off>off</Off>

@connect(state => ({
    user: getUser(state),
}), {logout})
export default class MemberProfile extends Component {

    logout = async () =>  {
        this.props.logout()
        redirect('/')
    }

    render() {
        const {user} = this.props

        if (!user) return <div />

        const {displayName, subscription} = user

        return (
            <Container>
                <Info>
                    <Name>{displayName}</Name>
                    <Subscription>Subscription: {renderSubscription(subscription)}</Subscription>
                </Info>
                <Toolbar>
                    <Logout onClick={this.logout} href="/api/v1/auth/logout">Logout</Logout>
                </Toolbar>
            </Container>
        )
    }
}

const Info = styled.div`
    padding-top: 10px;
    color: ${props => props.theme.colors.dark}
`

const Name = styled.h2`
    
`

const Subscription = styled.h4`
    
`

const On = styled.span`color: green;font-weight: bold;`
const Off = styled.span`color: red;font-weight: bold;`

const Toolbar = styled.div`
    padding-top: 10px;
`

const Logout = styled.button`
    background-color: #cccc;
    color: #fff;
    border: 0px;
    cursor: pointer;
    
    padding: 8px 10px;
    border-radius: 3px;
    
    display: flex;
    flex-align: center;
    align-items: center;
    justify-content: center;
`