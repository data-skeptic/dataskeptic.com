import Head from 'next/head'
import React from 'react'
import {ThemeProvider} from 'styled-components'
import theme from '../modules/styles'

import Header from "./Header";
import Footer from "./Footer"

import Player from './Player/Player'
import Overflow from '../components/Overflow'
import Cart from '../modules/Store/Containers/Cart'

const Layout = (props) => (
    <ThemeProvider theme={theme}>
        <div>
            <Head>
                <title>DataSkeptic</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </Head>

            <Header showCart={props.showOverflow}/>

            {props.overflow && <Overflow hide={props.hideOverflow}>
                <Cart />
            </Overflow>}

            <Player/>
            {props.children}
            <Footer/>
        </div>
    </ThemeProvider>)
export default Layout