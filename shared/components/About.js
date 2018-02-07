import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { map, isEmpty, orderBy } from 'lodash'
import marked from "marked"

import {changePageTitle} from '../Layout/Actions/LayoutActions';
import AuthorLink from "./AuthorLink";

const AVATAR_SIZE = 60

const markdown = (text) => {
    const rawMarkup = marked(text, {sanitize: true});
    return {__html: rawMarkup}
}

class About extends Component {

	componentWillMount() {
        const {dispatch} = this.props;
        dispatch(changePageTitle("About Data Skeptic"));
    }

    renderContributor = (contributor) =>
        <div className="media" key={contributor.contributor_id}>
            <div className="media-left">
				<AuthorLink author={contributor.author}><img width={AVATAR_SIZE} height={AVATAR_SIZE} className="media-object img-circle img-thumbnail" src={contributor.img} alt={contributor.prettyname} /></AuthorLink>
            </div>
            <div className="media-body">
                <h4 className="media-heading"><AuthorLink author={contributor.author}>{contributor.prettyname}</AuthorLink></h4>
				<p dangerouslySetInnerHTML={markdown(contributor.bio)} />
            </div>
        </div>

    renderContributors = (contributors) =>
		<div className="contributors-list">
			{map(contributors, this.renderContributor)}
		</div>

	sortContributors = (contributors) => orderBy(contributors, 'sort_rank')

	render() {
		const { contributors } = this.props

		return (
			<div className="center-about">
				<div className="row">
					<div className="col-xs-12 col-sm-6 about-cell">
						<img height="250" src="https://s3.amazonaws.com/dataskeptic.com/img/2018/ds-couch-sq-400.png" />
					</div>
					<div className="col-xs-12 col-sm-6 about-cell">
						<p className="about-cell-p">Data Skeptic produces this website and two podcasts.  The show is hosted by Kyle Polich.  Linh Da Tran co-hosts our mini-episodes.</p>
					</div>
				</div><div className="row">
					<div className="col-xs-12 col-sm-6 about-cell">
						<img width="250" src="https://s3.amazonaws.com/dataskeptic.com/img/yoshi.jpg" />
					</div>
					<div className="col-xs-12 col-sm-6 about-cell">
						<p className="about-cell-p">Yoshi is our official mascot and office bird.  She is also the focus of numerous mini-episode discussions.</p>
					</div>
				</div><div className="row">
					<div className="col-xs-12 col-sm-6 about-cell">
						<a href="https://itunes.apple.com/us/podcast/data-skeptic/id890348705?mt=2"><img width="250" src="https://s3.amazonaws.com/dataskeptic.com/img/primary-logo-400.jpg" /></a>
					</div>
					<div className="col-xs-12 col-sm-6 about-cell">
						<p className="about-cell-p">Our primary output is the weekly podcast featuring short mini-episodes explaining high level concepts in data science, and longer interview segments with researchers and practitioners.</p>
					</div>
				</div><div className="row">
					<div className="col-xs-12 col-sm-6 about-cell">
						<a href="https://itunes.apple.com/us/podcast/data-skeptic-bonus-feed/id1285937559"><img width="250" src="https://s3.amazonaws.com/dataskeptic.com/img/bonus-feed.jpg" /></a>
					</div>
					<div className="col-xs-12 col-sm-6 about-cell">
						<p className="about-cell-p">The bonus feed is extra and extended material if you just can't get enough Data Skeptic.</p>
					</div>
				</div>

				<div className="row">
					<h3>Contributors</h3>
					{!isEmpty(contributors) && this.renderContributors(this.sortContributors(contributors))}
				</div>
			</div>
		)
	}
}

export default connect(state => ({
	contributors: state.site.get('contributors').toJS()
}))(About)
