import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

export const BlogAuthorTop = ({ contributor={} }) => {
	if (contributor == undefined || contributor.prettyname == undefined) {
		return <div></div>
	}
    let twitterimg = '';
	let twitterlink = '';
	let linkedinimg = '';
	let linkedinlink = '';

	const {twitter, linkedin } = contributor;

	if (twitter) {
		const twitterurl = "https://twitter.com/" + twitter;
		twitterimg = <a href={twitterurl}><img src="/img/png/twitter.png" /></a>;
		twitterlink = <a href={twitterurl}>{twitter}</a>
	}

    if (linkedin) {
		linkedinimg = <a href={linkedin}><img src="/img/png/linkedin.png" /></a>
		linkedinlink = <a href={linkedin}>LinkedIn</a>
	}

	return (
		<div className="row blog-author-top">
			<div className="col-xs-12 col-sm-4"><b>Author:</b> {contributor.prettyname}</div>
			<div className="col-xs-12 col-sm-4">{twitterimg} {twitterlink}</div>
			<div className="col-xs-12 col-sm-4">{linkedinimg} {linkedinlink}</div>
		</div>
	)
};

export default BlogAuthorTop;
