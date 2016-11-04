import React from "react"
import ReactDOM from "react-dom"

import MailingList from "./MailingList"

const MailingListBlogFooter = props => {
	return (
		<div class="blog-mailinglist-container">
			<div class="blog-mailinglist-left">
				Enjoy this post?  Sign up for our mailing list and don't miss any updates.
			</div>
			<div class="blog-mailinglist-right">
				<MailingList />
			</div>
			<div class="clear"></div>
		</div>
	)		
}

export default MailingListBlogFooter
