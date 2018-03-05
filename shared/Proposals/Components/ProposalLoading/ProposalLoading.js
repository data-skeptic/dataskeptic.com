import React from 'react'

const ProposalLoading = ({
  title = "We're processing your recording...",
  content = 'Please wait until we will process your recording'
}) => {
  return (
    <div className="center">
      <div className="loading proposal">
        <div className="loading-icon-container proposal">
          <p>
            <img
              className="loading-icon"
              src="https://s3.amazonaws.com/dataskeptic.com/img/2018/Loading_icon.gif"
            />
          </p>
        </div>
        <p className="proposal-loading-title">{title}</p>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default ProposalLoading
