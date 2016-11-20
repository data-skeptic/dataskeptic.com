import React from "react"
import ReactDOM from "react-dom"

import Video from './Video'

export default class Videos extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		var videos = this.props.videos
		return (
			<div class="center">
				<div class="row videos-container">
					{videos.map(function(video) {
						return (
							<div key={video.videoId} class="col-xs-12">
								<Video video={video} />
								<div class="video-spacer"></div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}
