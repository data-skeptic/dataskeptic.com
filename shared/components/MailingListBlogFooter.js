import React from "react"
import ReactDOM from "react-dom"

import MailingList from "./MailingList"

const MailingListBlogFooter = props => {
	return (
		<div className="blog-mailinglist-container">
			<div className="blog-mailinglist-left">
				Enjoy this post?  Sign up for our mailing list and don't miss any updates.
			</div>
			<div className="blog-mailinglist-right">
				<MailingList />
			</div>
			<div className="clear"></div>
		</div>
	)		
}

export default MailingListBlogFooter
