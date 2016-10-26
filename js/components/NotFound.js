import React from 'react'

const NotFound = ({location}) => {
	return (
		<div class="center">
			That page is not found.
			Oh but to be a lost handler. 
			{location.pathname}
		</div>
	)
}

export default NotFound