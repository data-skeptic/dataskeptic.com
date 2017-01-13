import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import showdown from 'showdown'

class BlogAuthorBottom extends React.Component {

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
		var twitterhref="https://twitter.com/" + twitter
		var twitterdiv = <span></span>
		if (twitter != "") {
			twitterdiv = (<span>
				<img src="/img/png/twitter.png" />
				<a href={twitterhref}>{twitter}</a>
			</span>)
		}
		var bio = contributor.bio
		var converter = new showdown.Converter()
	    bio = converter.makeHtml(bio);
		return (
			<div className="blog-author-bottom">
				<div className="row">
					<div className="col-xs-12 col-sm-4 blog-author-img">
						<img src={contributor.img} />
					</div>
					<div className="col-xs-12 col-sm-8 blog-author-main">
						<p><b>Author:</b> {contributor.prettyname}</p>
						<p><span dangerouslySetInnerHTML={{__html: bio}} /></p>
						<p>{twitterdiv}</p>
					</div>
				</div>
			</div>
		)
	}
}
export default connect(state => ({ site: state.site }))(BlogAuthorBottom)
