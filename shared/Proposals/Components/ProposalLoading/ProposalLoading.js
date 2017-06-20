import React from 'react'

const ProposalLoading = () => {
    return (
        <div className="center">
            <div className="loading proposal">
                <div className="loading-icon-container proposal">
                    <p><img className="loading-icon" src="/img/Loading_icon.gif" /></p>
                </div>
                <p className="proposal-loading-title">We're processing your proposal...</p>
                <p>Please wait until we will process your proposal</p>

            </div>
        </div>
    )
}

export default ProposalLoading
