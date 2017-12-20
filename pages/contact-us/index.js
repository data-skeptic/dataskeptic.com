import React, {Component} from 'react'
import Container from '../../components/Container'
import Page from '../../hoc/Page'
import ContactUsContainer from "../../modules/ContactUs/Containers/ContactUsContainer";

@Page
export default class ContactUs extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []
        await Promise.all(promises)
    }

    render() {
        return (
            <Container global title={`Admin Login`}>
              <ContactUsContainer/>
           </Container>
        )
    }
}
