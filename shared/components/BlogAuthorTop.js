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
		var twitter = contributor.twitter || ""
		var twitterdiv = <span></span>
		var twitterurl = "https://twitter.com/" + twitter
		if (twitter != "") {
			twitterdiv = (<span>
				<img src="/img/png/twitter.png" />
				<a href={twitterurl}>{twitter}</a>
			</span>)
		}
		return (
			<div className="blog-author-top">
				<b>Author:</b> {contributor.prettyname}
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				{twitterdiv}
			</div>
		)
	}
}
export default connect(state => ({ site: state.site }))(BlogAuthorTop)
