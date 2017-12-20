import React, {Component} from 'react'
import Page from '../hoc/Page'
import {
    loadAll,
    hasHomeData
} from "../redux/modules/homeReducer";

import HomeContainer from "../modules/Home/Containers/HomeContainer";

@Page
export default class Dashboard extends Component {

    static async getInitialProps({store: {dispatch, getState}, query}) {
        const state = getState()
        const promises = []

        if (!hasHomeData(state)) {
            promises.push(dispatch(loadAll()))
        }

        await Promise.all(promises)
    }

    render() {
        return <HomeContainer/>

    }
}
