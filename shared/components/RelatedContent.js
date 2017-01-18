import axios from "axios"
import React from "react"
import ReactDOM from "react-dom"

export default class RelatedContent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: []
		}
	}

	componentDidMount() {
		var self = this
		var pn = this.props.prettyname
		if (pn == undefined || pn == "") {
			return
		}
		var uri = "/api/related?uri=/blog" + pn
		console.log(uri)
	    axios
	        .get(uri)
	        .then(function(resp) {
	          var data = resp['data']
	          var items = data
	          self.setState({items})

	        })
	        .catch(function(err) {
	          console.log(err)
	        })

	}
	
	render() {
		var pn = this.props.prettyname
		var items = this.state.items || []
		if (items.length == 0) {
			return <div></div>
		}
		return (
			<div>
			<h2>Related Content</h2>
			{items.map(function(item) {
				var desc = item.desc
				var title = item.title
				var uri = item.desc
				return (
					<div className="related-content">
						<a href={uri}>{title}</a> - {desc}
					</div>
					)
			})}
			</div>
		)
	}
}
