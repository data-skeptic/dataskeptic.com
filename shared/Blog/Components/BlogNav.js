import React, { PropTypes } from "react"

import BlogLink from './BlogLink';
import BLOGS_NAV_MAP from '../../Blog/Constants/navMap';

export const BlogNav = ({folders=[], pathname, up='All', onClick, activeFolder}) => (
	<div className="blog-nav">
		<div className="blog-categories">
			<div className="zblog-link-container">
				<BlogLink onClick={onClick} active="/blog" to="/blog" isActive={activeFolder === up}>{up}</BlogLink>
			</div>
            {folders.map(function(folder) {
                const path = "/blog/" + folder + "/";
                return (
					<div key={path} className="zblog-link-container">
						<BlogLink active={pathname} to={path} onClick={onClick} isActive={activeFolder === folder}>{BLOGS_NAV_MAP[folder]}</BlogLink>
					</div>
                )
            })}
		</div>
	</div>
);

export default BlogNav;