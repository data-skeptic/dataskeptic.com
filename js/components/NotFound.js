import React from 'react'

const NotFound = ({location}) => {
	return (
		<div class="center">
			Sorry, that page is not found.
			{location.pathname}
		</div>
	)
}

export default NotFound