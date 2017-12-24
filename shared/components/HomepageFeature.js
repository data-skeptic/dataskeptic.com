import React from 'react'
import { connect } from 'react-redux';

import Loading from "../Common/Components/Loading"
import Error from "../Common/Components/Error"

class HomepageFeature extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<div className="hf-title"><h2>Title</h2></div>
				<div className="hf-img"><img width="400" src="https://4.bp.blogspot.com/-7VeCN1lPAeA/WL2abQ8pfmI/AAAAAAAADnE/u4dhz3tRGysJppPoMm6np-N24Rqfvgc9wCLcB/s1600/Katrina_Go_Away_sign.jpg" /></div>
				<div className="hf-date">Date</div>
				<div className="hf-abstract">Abstract</div>
				<p>Feature of the week!!</p>
			</div>
		)
	}
}

export default connect(state => ({  }))(HomepageFeature)

