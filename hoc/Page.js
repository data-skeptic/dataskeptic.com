import React, {Component} from 'react'
import {Provider} from 'react-redux'
import initStore from '../redux/initStore'
import initClient from '../client'
import Layout from '../components/Layout';
import routingDimmer from './RoutingDimmer'
import {
    isReady as isAuthReady,
    init as initAuth
} from '../redux/modules/auth'

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

            if (!isAuthReady(store.getState())) {
                await store.dispatch(initAuth())
            }

            const otherProps = WrappedComponent.getInitialProps
                ? await WrappedComponent.getInitialProps({...context, store})
                : {}

            return {...otherProps, initialState: store.getState(), cookie}
        }

        constructor(props) {
            super(props)
            const client = initClient(process.browser ? undefined : props.cookie)
            this.store = initStore(props.initialState, client)

            this.state = {overflow: false}
        }

        showOverflow = () => this.setState({overflow: true})
        hideOverflow = () => this.setState({overflow: false})

        render() {
            const {initialState, cookie, ...rest} = this.props
            const {overflow} = this.state

            return (
                <Provider store={this.store}>
                    <Layout overflow={overflow} showOverflow={this.showOverflow} hideOverflow={this.hideOverflow}>
                        <DimmedComponent {...rest} />
                    </Layout>
                </Provider>
            )
        }
    }

    return Page
}

export default page