import React from "react"
import ReactDOM from "react-dom"
import axios from "axios"
import querystring from 'querystring'
import { connect } from 'react-redux'

class RelatedContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	type: "internal-link",
      source: "",
      dest: "",
      title: "",
      body: ""
    }
  }

  update(me, title, event) {
    var s = me.state
    var val = event.target.value
    s[title] = val
    me.setState(s);
    if (title == "type") {
      if (val == "internal-link") {
        me.setState({"lbl2": "Related page url", "lbl3": "Link Anchor Text", "lbl4": "Comment", "dest": "https://dataskeptic.com/blog/"})
      } else if (val == "external-link") {
        me.setState({"lbl2": "Related page url", "lbl3": "Link Anchor Text", "lbl4": "Comment", "dest": "https://"})
      } else if (val == "mp3") {
        me.setState({"lbl2": "Media URL", "lbl3": "Title of recording", "lbl4": "Description", "dest": "https://dataskeptic.com/blog/"})
      } else if (val == "person") {
        me.setState({"lbl2": "Leave blank", "lbl3": "Guest Name", "lbl4": "Guest Bio", "dest": ""})
      } else if (val == "homepage-image") {
        me.setState({"lbl2": "Image url", "lbl3": "Alt text", "lbl4": "Leave Blank", "dest": ""})
      } else if (val == "blog-header-img") {
        me.setState({"lbl2": "Image url", "lbl3": "Alt text", "lbl4": "Leave Blank", "dest": ""})        
      }
    }
  }

  save(dispatch) {
    dispatch({type: "RELATED_CONTENT_ADD", payload: {data: this.state, dispatch} })
  }

  render() {
    var me = this
    var dispatch = this.props.dispatch
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

        <p>Source blog_id:</p>
        <input onChange={this.update.bind(this, me, "source")} value={this.state.source} />
        <p>{this.state.lbl2}:</p>
        <input onChange={this.update.bind(this, me, "dest")} value={this.state.dest} />

        <p>{this.state.lbl3}:</p>
        <input onChange={this.update.bind(this, me, "title")} value={this.state.title} />

        <p>{this.state.lbl4}:</p>
        <input onChange={this.update.bind(this, me, "body")} value={this.state.body} />

        <br/>
        <button onClick={this.save.bind(this, dispatch)}>Add</button>
      </div>
  	)
  }
}
export default connect(state => ({ }))(RelatedContent)


