import React from "react";

const ProposeButton = ({editUrl='#'}) => (
	<div className="button-propose-container">
		<a href={editUrl}  target="_blank"><button className="btn-propose btn btn-block btn-sm">Propose Edit<i className="glyphicon glyphicon-pencil"/></button></a>
		<p className="propose-text">Have a word to say? Propose a specific change to the blog post.</p>
	</div>
);

export default ProposeButton;