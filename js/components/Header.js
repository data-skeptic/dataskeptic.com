import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class='header row row-centered'>
				<div class="center">
					<div class="col-sm-12">
						<div class="header-left">
							<Link to="/"><img id="logo" src="/img/svg/data-skeptic-logo.svg" alt="Data Skeptic logo" /></Link>
						</div>
						<div class='header-right'>
							<h1>Data Skeptic</h1>
							<p class="header-p">Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.</p>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		)
	}
}
