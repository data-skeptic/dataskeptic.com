import React from "react"
import ReactDOM from "react-dom"
import querystring from 'querystring'
import { connect } from 'react-redux'

class RelatedContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	type: "",
      source: "",
      dest: "",
      title: "",
      body: "",
      selected: false
    }
  }

  update(me, title, event) {
    var s = me.state
    var val = event.target.value
    s[title] = val
    me.setState(s);
    if (title == "type") {
      if (val == "internal-link") {
        me.setState({"lbl2": "Related blog_id", "lbl3": "Link Anchor Text", "lbl4": "Comment", "dest": "https://dataskeptic.com/blog/", "selected": true})
      } else if (val == "external-link") {
        me.setState({"lbl2": "Related page url", "lbl3": "Link Anchor Text", "lbl4": "Comment", "dest": "https://", "selected": true})
      } else if (val == "mp3") {
        me.setState({"lbl2": "Media URL", "lbl3": "Title of recording", "lbl4": "Description", "dest": "https://dataskeptic.com/blog/", "selected": true})
      } else if (val == "person") {
        me.setState({"lbl2": "IMG URL", "lbl3": "Guest Name", "lbl4": "Guest Bio", "dest": "", "selected": true})
      } else if (val == "homepage-image") {
        me.setState({"lbl2": "Image url (600x250px)", "lbl3": "Alt text", "lbl4": "Leave Blank", "dest": "", "selected": true})
      } else if (val == "blog-header-img") {
        me.setState({"lbl2": "Image url (800x150px)", "lbl3": "Alt text", "lbl4": "Leave Blank", "dest": "", "selected": true})
      } else {
        me.setState({"selected": false})
      }
    }
  }

  save(dispatch) {
    dispatch({type: "RELATED_CONTENT_ADD", payload: {data: this.state, dispatch} })
  }

  render() {
    var oadmin = this.props.admin.toJS()
    var add_related_msg = oadmin['add_related_msg']
    var me = this
    var dispatch = this.props.dispatch
    var bdy = (
        <div></div>
      )
    if (this.state.selected) {
      bdy = (
        <div className="center">
          <div className="row">
            <div className="col-xs-3"><p>Source blog_id:</p></div>
            <div className="col-xs-9"><input width="100%" onChange={this.update.bind(this, me, "source")} value={this.state.source} /></div>
          </div>

          <div className="row">
            <div className="col-xs-3"><p>{this.state.lbl2}:</p></div>
            <div className="col-xs-9"><input onChange={this.update.bind(this, me, "dest")} value={this.state.dest} /></div>
          </div>

          <div className="row">
            <div className="col-xs-3"><p>{this.state.lbl3}:</p></div>
            <div className="col-xs-9"><input onChange={this.update.bind(this, me, "title")} value={this.state.title} /></div>
          </div>

          <div className="row">
            <div className="col-xs-3"><p>{this.state.lbl4}:</p></div>
            <div className="col-xs-9"><input onChange={this.update.bind(this, me, "body")} value={this.state.body} /></div>
          </div>

          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-9"><button onClick={this.save.bind(this, dispatch)}>Add</button></div>
          </div>
          <p>{add_related_msg}</p>
        </div>
      )
    }
  	return (
      <div>
        <h3>Add Related Content</h3>

        <select onChange={this.update.bind(this, me, "type")}>
          <option value="">-- [SELECT] --</option>
          <option value="internal-link">internal-link</option>
          <option value="external-link">external-link</option>
          <option value="homepage-image">homepage-image</option>
          <option value="blog-header-img">blog-header-img</option>
          <option value="mp3">mp3</option>
          <option value="person">person</option>
        </select>

        {bdy}
      </div>
  	)
  }
}
export default connect(state => ({
  admin: state.admin
}))(RelatedContent)


