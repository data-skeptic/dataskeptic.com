import React from 'react'

const NotFound = ({location}) => {
	return (
		<div className="center">
			<p>Sorry, that page is not found.</p>
			<p>If you wouldn't mind, please drop a line to <a href="mailto:kyle@dataskeptic.com">kyle@dataskeptic.com</a> and let us know what you were looking for.</p>
			<p>{location.pathname}</p>
		</div>
	)
}

export default NotFound