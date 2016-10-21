import React from "react"
import ReactDOM from "react-dom"

export default class Menu extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<div class="menu">
				<div class="center">
					<span class="menu-link">Home</span>
					<span class="menu-link">Podcast</span>
					<span class="menu-link">Video</span>
					<span class="menu-link">Projects</span>
					<span class="menu-link">Store</span>
					<span class="menu-link">Services</span>
					<span class="menu-link">Membership</span>
				</div>
			</div>
		)
	}
}
