import React from 'react'
import { Link } from 'react-router'

const SnlImpact = () => {
  /*
		Episode
		Link to shiny app, small screenshot
		Using Shiny video
		Link to other guy's paper and conference
		Bibliography / further reading
		Related blogs
	*/
  return (
    <div className="center">
      <h2>Causal Impact</h2>
      <p>
        We're going to regularly add a few pieces of content about Causal Impact
        as they come up on Data Skeptic. Check back later for more interesting
        things!
      </p>
      <ul>
        <li>
          <a href="http://dataskeptic.com/blog/episodes/2016/causal-impact">
            Podcast episode
          </a>
        </li>
        <li>
          <a href="http://snl.dataskeptic.com/">Shinny App</a>
        </li>
      </ul>
    </div>
  )
}

export default SnlImpact
