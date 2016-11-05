import React from 'react'

import ContactForm from "./ContactForm"

const Services = () => {
	return (
		<div class="center">
			<div class="services-container">
				<div class="services-box">
					<div class="services-title">Technology Advisor</div>
					<p>When creating data science microservices, products, and systems, you need a scalable robust infrastructure and deployment plan.  Picking the right platform to suit your use case is difficult.  We can help.</p>
				</div>
				<div class="services-box">
					<div class="services-title">Team Building</div>
					<p>Are you looking to hire your first data scientist or expand your fledgling team?  Finding the right data scientist to match your unique business needs can be challenging.  We can help.</p>
				</div>
				<div class="services-box">
					<div class="services-title">Solutions</div>
					<p>Looking to integrate data science into your company but not yet looking to build a full time team?  Let us help take you from proof of concept to production delivery.</p>
				</div>
				<div class="services-box">
					<div class="services-title">Advertising</div>
					<p>Data Skeptic is the #1 ranked data science related podcast on iTunes.  We reach a highly targetted audience on a weekly basis via the podcast as well as via the Data Skeptic blog and other outlets.  Let's talk about how we can help get your message to our audience.</p>
				</div>
			</div>
			<div class="clear"></div>
			<ContactForm />
		</div>
	)
}

export default Services
