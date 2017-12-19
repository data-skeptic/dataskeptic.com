import React, { Component } from 'react'
import Page from './Page'
import { getUser } from '../redux/modules/auth'
import { redirect } from '../util'

const adminPage = WrappedComponent => {

    @Page
    class AdminPage extends Component {

        static async getInitialProps(context) {
            const { store, res, pathname } = context
            const state = store.getState()
            const user = getUser(state)

            if (!user) {
                redirect('/admin/login', res)
                return
            }

            const otherProps = WrappedComponent.getInitialProps
                ? await WrappedComponent.getInitialProps({
                    ...context,
                    store,
                    user
                })
                : {}

            return { ...otherProps, user }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    return AdminPage
}

export default adminPage
