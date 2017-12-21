import React, {Component} from "react"
import Link from "../../components/Link"
import Ionicon from "react-ionicons"
import styled from "styled-components"
import AdminPage from "../../hoc/AdminPage"
import Container from "../../components/Container"

const Action = ({ title, icon, ...rest }) =>
    <ActionLink {...rest}>
        <IconArea><Ionicon icon={icon} size="60px"/></IconArea>
        <Label>{title}</Label>
    </ActionLink>

@AdminPage
export default class Admin extends Component {
    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState();
        const promises = [];

        await Promise.all(promises);
    }

    render() {
        return (
            <Container title={`Admin Panel`}>
                <Inner>
                    <Title>Admin Panel</Title>

                    <Actions>
                        <Action href="/admin/config" icon="ios-construct-outline" title="Site Config" />
                        <Action href="/admin/posts" icon="ios-list-box-outline" title="Posts Editor" />
                        <Action href="/admin/orders" icon="md-folder" title="Orders" />
                        <Action href="/admin/emails" icon="ios-mail" title="Emails" />
                    </Actions>
                </Inner>
            </Container>
        );
    }
}

const Inner = styled.div`padding: 20px 0px;`
const Title = styled.h2`text-align: center;`

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;    
    justify-content: space-between;
    max-width: 600px; 
    margin: 0px auto;
`


const ActionLink = styled(Link)`
    background-color: #3a3b3b;
    height: 120px;
    flex: 0 0 47.5%;
    padding: 10px;
    border-radius: 5px;
    margin: 10px 0 0;
    background: #fafafa;
    border: 1px solid #d7d9d9;
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const IconArea = styled.div``

const Label = styled.div`
    font-size: 20px; 
    text-align: center;
`
