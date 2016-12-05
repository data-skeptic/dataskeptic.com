import React from 'react'

const NotFound = ({location}) => {
	return (
		<div className="center">
			Sorry, that page is not found.
			{location.pathname}
		</div>
	)
}

export default NotFound