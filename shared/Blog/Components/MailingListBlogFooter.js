import React from "react"

import MailingList from "../../Common/Components/MailingList"

const MailingListBlogFooter = props => {
	return (
		<div className="blog-mailinglist-container">
			<MailingList heading={`Enjoy this post? Sign up for our mailing list and don't miss any updates.`} />
		</div>
	)		
}

export default MailingListBlogFooter
