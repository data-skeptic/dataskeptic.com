import Head from 'next/head'
import React from 'react';
import Header from "./Header";
import Footer from "./Footer"
import Container from "./Container";

import Player from './Player/Player'
import theme from '../shared/styles'
import {ThemeProvider, injectGlobal} from 'styled-components'

injectGlobal`
  @font-face {
    font-family: 'SF Light';
    src: url('/static/fonts/SFUIDisplay-Light.otf');
  }
  @font-face {
    font-family: 'SF Regular';
    src: url('/static/fonts/SFUIDisplay-Regular.otf');
  }
  @font-face {
    font-family: 'SF Medium';
    src: url('/static/fonts/SFUIDisplay-Medium.otf');
  } 
  @font-face {
    font-family: 'SF Bold';
    src: url('/static/fonts/SFUIDisplay-Bold.otf');
  }
  body {
    font-family: 'SF Regular';
  }
`;

const Layout = (props) => (
    <ThemeProvider theme={theme}>
        <div>
            <Head>
                <title>DataSkeptic</title>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" rel="stylesheet"/>
            </Head>
            <Header/>
            <Player/>
            {props.children}
            <Footer/>
        </div>
    </ThemeProvider>)
export default Layout