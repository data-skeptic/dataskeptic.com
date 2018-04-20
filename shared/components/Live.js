import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import Loading from '../Common/Components/Loading'

class Live extends React.Component {
  	constructor(props) {
    	super(props)
 	}

	componentDidMount() {
	  	var dispatch = this.props.dispatch
	    dispatch({
	        type: 'CMS_CHECK_LIVE',
	        payload: { dispatch }
	    })
	}

  	render() {
	  	var ocms = this.props.cms.toJS()
	  	var live = ocms['live']
	  	if (live == "loading") {
  			<Loading />
	  	}
	  	else if (live != "") {
	  		var src = "https://www.youtube.com/embed/" + live
			return (
				<center>
					<iframe width="560" height="315" src={src} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</center>
			)
	  	} else {
			return (
				<div className="center">
					<h2>We are not live at the moment</h2>
					<p>If and when we do live streams, this page will automatically embed the stream for you.</p>
					<p>If you think you're reaching this message in error, perhaps try <a href="https://www.youtube.com/channel/UC60gRMJRjTuTskBnl-LkPAg">Data Skeptic on Youtube</a>.</p>
				</div>
			)
	  	}
	}
}

export default connect(state => ({
  cms: state.cms
}))(Live)
