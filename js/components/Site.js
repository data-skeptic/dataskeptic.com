import React from "react"
import ReactDOM from "react-dom"

import Header from './Header'
import Menu from './Menu'
import Home from './Home'
import Footer from './Footer'


export default class Site extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				<Header />
				<Menu />
				<Home />
				<Footer />
			</div>
		)
	}
}
