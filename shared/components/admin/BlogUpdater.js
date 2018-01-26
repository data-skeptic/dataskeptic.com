import React from "react"
import ReactDOM from "react-dom"
import querystring from 'querystring'
import { connect } from 'react-redux'

class BlogUpdater extends React.Component {
	constructor(props) {
		super(props);
		this.state = props.blog
	}

	update(me, title, event) {
		console.log(event)
		console.log(event.target)
		console.log(event.target.value)
		var s = me.state
		s[title] = event.target.value
    	me.setState(s);
	}

	save(blog_id, title, abstract, author, publish_date, dispatch) {
		console.log("save")
	    dispatch({type: "CMS_UPDATE_BLOG", payload: {blog_id, title, abstract, author, publish_date} })
	}

	componentDidMount() {
	}

	render() {
		var dispatch = this.props.dispatch
		var blog = this.state
		var blog_id = blog["blog_id"]
		var title = blog["title"]
		var abstract = blog["abstract"]
		var author = blog["author"]
		var publish_date = blog["publish_date"]
		var prettyname = blog["prettyname"]
		var me = this
		return (
			<div className="cms-admin-container">
				<div className="row">
					<div className="bbb col-xs-12 col-sm-2">blog_id:</div>
					<div className="col-xs-12 col-sm-10">{blog_id}</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-2">Prettyname:</div>
					<div className="col-xs-12 col-sm-10">https://dataskeptic.com/blog{prettyname}</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-2">Title:</div>
					<div className="col-xs-12 col-sm-10"><input className="cms-title-input" onChange={this.update.bind(this, me, "title")} value={title} /></div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-2">Abstract:</div>
					<div className="col-xs-12 col-sm-10">
						<textarea className="cms-abstract-textarea" onChange={this.update.bind(this, me, "abstract")} value={abstract} />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-2">Author:</div>
					<div className="col-xs-12 col-sm-2"><input onChange={this.update.bind(this, me, "author")} value={author} /></div>
					<div className="col-xs-12 col-sm-2">Publish date:</div>
					<div className="col-xs-12 col-sm-6"><input className="cms-publish-date-input" onChange={this.update.bind(this, me, "publish_date")} value={publish_date}/></div>
				</div>
				<div className="row">
					<div className="col-xs-12 col-sm-2"></div>
					<div className="col-xs-12 col-sm-10 cms-admin-save-btn"><button className="cms-btn-save" onClick={this.save.bind(this, blog_id, title, abstract, author, publish_date, dispatch)}>Save</button></div>
				</div>
			</div>
		)
	}
}
export default connect(state => ({}))(BlogUpdater)

