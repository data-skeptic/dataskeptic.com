import React from "react"
import ReactDOM from "react-dom"

import Header from './Header'
import Menu from './Menu'
import Home from './Home'
import Footer from './Footer'


export default class Site extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			"page": "home"
		}
		this.onMenuClick = this.onMenuClick.bind(this)
	}

	onMenuClick(e) {
		console.log(e)
	}
	
	render() {
		if (this.state.page == "podcast") {
			return (<div><Header /><Menu onMenuClick="this.onMenuClick.bind(this)" /><Podcast /><Footer /></div>)
		}
		else {
			return (<div><Header /><Menu /><Home /><Footer /></div>)
		}
	}
}
