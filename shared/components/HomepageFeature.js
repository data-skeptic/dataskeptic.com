import React from 'react'
import { connect } from 'react-redux';

import Loading from "../Common/Components/Loading"
import Error from "../Common/Components/Error"

class HomepageFeature extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		var ocms = this.props.cms.toJS()
		console.log(ocms)
		var featured_blog = ocms.featured_blog
		if (featured_blog == {}) {
			return <Loading />
		}
		var title = featured_blog.title
		var abstract = featured_blog.abstract
		var date = ""
		if (featured_blog.publish_date) {
			date = featured_blog.publish_date.substring(0, 10)			
		}
		var img = "https://4.bp.blogspot.com/-7VeCN1lPAeA/WL2abQ8pfmI/AAAAAAAADnE/u4dhz3tRGysJppPoMm6np-N24Rqfvgc9wCLcB/s1600/Katrina_Go_Away_sign.jpg"
		return (
			<div className="feature_of_the_week">
				<div className="hf-img"><img width="600" height="250" src={img} /></div>
				<div className="hf-title"><h2 className="hf-title-h2">{title}</h2></div>
				<div className="hf-date">{date}</div>
				<div className="hf-abstract">{abstract}</div>
				<p>Feature of the week!!</p>
			</div>
		)
	}
}

export default connect(state => ({ 
	cms: state.cms
}))(HomepageFeature)

