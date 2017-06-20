import React from 'react'

const ProposalLoading = ({title="We're processing your proposal...", content="Please wait until we will process your proposal"}) => {
    return (
        <div className="center">
            <div className="loading proposal">
                <div className="loading-icon-container proposal">
                    <p><img className="loading-icon" src="/img/Loading_icon.gif" /></p>
                </div>
                <p className="proposal-loading-title">{title}</p>
                <p>{content}</p>
            </div>
        </div>
    )
}

export default ProposalLoading
