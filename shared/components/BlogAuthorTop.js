import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'

class BlogAuthorTop extends React.Component {

	constructor(props) {
		super(props)
	}
	
	render() {
		var osite = this.props.site.toJS()
		var author = this.props.author || ""
		var contributor = osite.contributors[author]
		if (author == "" || contributor == undefined) {
			return <div></div>
		}
		var twitterimg = <span></span>
		var twitterlink = <span></span>
		var linkedinimg = <span></span>
		var linkedinlink = <span></span>
		var twitter = contributor.twitter || ""
		var linkedin = contributor.linkedin || ""
		if (twitter != "") {
			var twitterurl = "https://twitter.com/" + twitter
			twitterimg = <a href={twitterurl}><img src="/img/png/twitter.png" /></a>
			twitterlink = <a href={twitterurl}>{twitter}</a>
		}
		if (linkedin != "") {
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
	}
}
export default connect(state => ({ site: state.site }))(BlogAuthorTop)
