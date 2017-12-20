import React, { Component } from 'react'
import Page from './Page'
import { getUser } from '../redux/modules/auth'
import { redirect } from '../util'
import styled from 'styled-components'

const memberPage = WrappedComponent => {

    @Page
    class MemberPage extends Component {

        static async getInitialProps(context) {
            const { store, res, pathname } = context
            const state = store.getState()
            const user = getUser(state)

            console.dir(user)
            if (!user) {
                redirect('/account/login', res)
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

    return MemberPage
}

export default memberPage
