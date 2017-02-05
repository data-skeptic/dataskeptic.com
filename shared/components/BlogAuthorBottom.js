import React from "react"
import ReactDOM from "react-dom"
import { connect } from 'react-redux'
import showdown from 'showdown'

class BlogAuthorBottom extends React.Component {

	constructor(props) {
		super(props)
	}
	
	render() {
		var oblogs = this.props.blogs.toJS()
		var contributor = oblogs.blog_focus.contributor
		if (contributor == undefined) {
			return <div></div>
		}
		var twitter = contributor.twitter || ""
		var linkedin = contributor.linkedin || ""
		var twitterdiv = <span></span>
		var linkedindiv = <span></span>
		if (twitter != "") {
			var twitterhref="https://twitter.com/" + twitter
			twitterdiv = (<div>
				<img src="/img/png/twitter.png" />
				<a href={twitterhref}>{twitter}</a>
			</div>)
		}
		if (linkedin != "") {
			linkedindiv = (<div>
				<img src="/img/png/linkedin.png" />
				<a href={linkedin}>LinkedIn</a>
			</div>)
		}
		var bio = contributor.bio
		var converter = new showdown.Converter()
	    bio = converter.makeHtml(bio)
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
}
export default connect(state => ({ blogs: state.blogs }))(BlogAuthorBottom)
