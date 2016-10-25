import React from 'react'

var NotFound = ({location}) => {
	return (
		<div>
			That page is not found.
			Oh but to be a lost handler. 
			{location.pathname}
		</div>
	)
}

export default NotFound