import React from "react"
import ReactDOM from "react-dom"

import Video from './Video'

export default class Videos extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		var videos = this.props.videos
		console.log(videos)
		return (
			<div class="center">
				<div class="videos-container">
					{videos.map(function(video) {
						return <Video key={video.videoId} video={video} />
					})}
				</div>
			</div>
		)
	}
}
