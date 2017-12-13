import React, {Component} from 'react'
import {Provider} from 'react-redux'
import initStore from '../redux/initStore'
import initClient from '../client'
import Layout from '../components/Layout';
import routingDimmer from './RoutingDimmer'
import 'mdn-polyfills/Object.assign'
import 'mdn-polyfills/String.prototype.startsWith'

if (process.browser) {
    window.RichTextEditor = require('react-rte').default
}


const page = WrappedComponent => {
    const DimmedComponent = routingDimmer(WrappedComponent)

    class Page extends Component {
        static async getInitialProps(context) {
            const cookie = context.req && context.req.headers.cookie
            const client = initClient(cookie)
            const store = initStore(undefined, client)

            const otherProps = WrappedComponent.getInitialProps
                ? await WrappedComponent.getInitialProps({...context, store})
                : {}

            return {...otherProps, initialState: store.getState(), cookie}
        }

        constructor(props) {
            super(props)
            const client = initClient(process.browser ? undefined : props.cookie)
            this.store = initStore(props.initialState, client)
        }

        render() {
            const {initialState, cookie, ...rest} = this.props
            return (
                <Provider store={this.store}>
                    <Layout>
                        <DimmedComponent {...rest} />
                    </Layout>
                </Provider>
            )
        }
    }

    return Page
}

export default page