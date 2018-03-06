import Head from 'next/head'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Container from './Container'

import Player from './Player/Player'
import theme from '../shared/styles'
import { ThemeProvider } from 'styled-components'

const Layout = props => (
  <ThemeProvider theme={theme}>
    <div>
      <Head>
        <title>DataSkeptic</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Header />
      <Player />
      {props.children}
      <Footer />
    </div>
  </ThemeProvider>
)
export default Layout
