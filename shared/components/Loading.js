import React from 'react'

const Loading = () => {
	return (
		<div className="center">
			<div className="loading">
				<p>Loading...</p>
				<div className="loading-icon-container">
					<p><img className="loading-icon" src="/img/Loading_icon.gif" /></p>
				</div>
			</div>
		</div>
	)
}

export default Loading