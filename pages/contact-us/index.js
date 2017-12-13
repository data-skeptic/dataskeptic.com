import React, {Component} from 'react'

import Page from '../../hoc/Page'


@Page
export default class ContactUs extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []
        await Promise.all(promises)
    }

    render() {
        return <div>CONTACT US</div>

    }
}
