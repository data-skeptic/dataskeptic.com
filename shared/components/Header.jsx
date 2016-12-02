import React from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div className='header row row-centered'>
				<div className="center">
					<div className="col-sm-12">
						<div className="header-left">
							<Link to="/"><img id="logo" src="/img/svg/data-skeptic-logo.svg" alt="Data Skeptic logo" /></Link>
						</div>
						<div className='header-right'>
							<h1>Data Skeptic</h1>
							<p className="header-p">Data science, statistics, machine learning, artificial intelligence, and scientific skepticism.</p>
						</div>
					</div>
					<div className="clear"></div>
				</div>
			</div>
		)
	}
}
