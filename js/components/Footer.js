import React from "react"
import ReactDOM from "react-dom"

export default class Footer extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div>
				<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><img src="/img/png/by-nc-sa.eu.png" height="25" alt="Data Skeptic is released under a creative commons attribution non-comercial share alike 4.0 license" /></a>
			</div>
		)
	}
}
