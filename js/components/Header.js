import React from "react"
import ReactDOM from "react-dom"

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class='header'>
				<div class="center">
					<div class="header-left">
						<img id="logo" src="/img/svg/data-skeptic-logo.svg" alt="Data Skeptic logo" />
					</div>
					<div class='header-right'>
						<h1>Data Skeptic</h1>
						<p class="header-p">Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.</p>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		)
	}
}
