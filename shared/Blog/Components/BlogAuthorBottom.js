import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import showdown from 'showdown'

export const BlogAuthorBottom = ({contributor}) => {
	if (contributor == undefined || contributor.prettyname == undefined) {
		return <div></div>
	}

    let twitterhref = null;
    let twitterdiv = null;
    let linkedindiv = null;

    const {twitter, linkedin, bio } = contributor;

    if (twitter) {
        twitterhref="https://twitter.com/" + twitter;
 		twitterdiv = (
			<div>
 				<img src="/img/png/twitter.png" />
 				<a href={twitterhref}>{twitter}</a>
 			</div>
		)
    }

    if (linkedin) {
        linkedindiv = (
        	<div>
				<img src="/img/png/linkedin.png" />
				<a href={linkedin}>LinkedIn</a>
			</div>
		)
    }

	return (
		<div className="blog-author-bottom">
			<div className="row">
				<div className="col-xs-12 col-sm-5 blog-author-img">
					<img src={contributor.img} />
				</div>
				<div className="col-xs-12 col-sm-7 blog-author-main">
					<p><b>Author:</b> {contributor.prettyname}</p>
					<p><span dangerouslySetInnerHTML={{__html: bio}} /></p>
					{linkedindiv}
					{twitterdiv}
				</div>
			</div>
		</div>
	)
}

export default BlogAuthorBottom;