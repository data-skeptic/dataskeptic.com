import React from 'react'
import { Link } from 'react-router';

const PageNotFound = () => {
	return (
		<div class="center">
			<h2>Not found!</h2>
			<p>Sorry, but you've hit our error page.</p>
	        <Link to="/">Go back to the main page</Link>
		</div>
	)
}

export default PageNotFound
