import React, { PropTypes } from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

export const BlogAuthorTop = ({ contributor={} }) => {
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

BlogAuthorTop.propTypes = {
    contributor: PropTypes.object
};

export default BlogAuthorTop;

// class BlogAuthorTop extends React.Component {
//
// 	constructor(props) {
// 		super(props)
// 	}
//
// 	render() {
// 		var oblogs = this.props.blogs.toJS()
// 		var contributor = oblogs.blog_focus.contributor
// 		if (contributor == undefined) {
// 			return <div></div>
// 		}
// 		var pn = oblogs.blog_focus.blog.prettyname
// 		if (pn.indexOf('/episodes/') == 0 || pn.indexOf('/transcripts/') == 0) {
// 			return <div></div>
// 		}
// 		var twitterimg = <span></span>
// 		var twitterlink = <span></span>
// 		var linkedinimg = <span></span>
// 		var linkedinlink = <span></span>
// 		var twitter = contributor.twitter || ""
// 		var linkedin = contributor.linkedin || ""
// 		if (twitter != "") {
// 			var twitterurl = "https://twitter.com/" + twitter
// 			twitterimg = <a href={twitterurl}><img src="/img/png/twitter.png" /></a>
// 			twitterlink = <a href={twitterurl}>{twitter}</a>
// 		}
// 		if (linkedin != "") {
// 			linkedinimg = <a href={linkedin}><img src="/img/png/linkedin.png" /></a>
// 			linkedinlink = <a href={linkedin}>LinkedIn</a>
// 		}
// 		return (

// 		)
// 	}
// }
// export default connect(state => ({ blogs: state.blogs }))(BlogAuthorTop)
