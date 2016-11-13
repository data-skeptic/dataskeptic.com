import React from 'react'
import { Link } from 'react-router'

const Projects = () => {
	return (
		<div class="center">
			<div class="project-box">
				<div class="project-img-container"><img class="project-img" src="/img/png/openhouse.png" /></div>
				<div class="project-title">OpenHouseProject.co</div>
				<p>OpenHouse makes analysis grade transactional home sales data available via web and API.</p>
				<div class="project-link">
					<a href="http://openhouseproject.co">OpenHouseProject.co</a>
				</div>
			</div>
			<div class="project-box">
				<div class="project-img-container"><img class="project-img" src="/img/png/snl.png" /></div>
				<div class="project-title">SNL Causal Impact</div>
				<p>As an appendix to our Causal Impact episode, we teamed up with <a href="http://github.com/kjblakemore">Karen Blakemore</a> to create a Shiny webapp to interact with the Saturday Night Live analysis.</p>
				<div class="project-link">
					<a href="http://snl.dataskeptic.com">snl.dataskeptic.com</a>
				</div>
			</div>
			<div class="clear"></div>
			<div class="project-bottom">
				If you like our work, perhaps we can collaborate.  Checkout our <Link to="/services">Services</Link> page for details.
			</div>
		</div>
	)
}

export default Projects