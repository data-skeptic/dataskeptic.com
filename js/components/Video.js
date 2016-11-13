import React from 'react'
import YouTube from 'react-youtube'


const Video = props => {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters 
        autoplay: 1
      }
    }
	var _onReady = function(event) {
		// access to player in all event handlers via event.target 
		event.target.pauseVideo()
	}
	return (
		<div class="video">
			<YouTube videoId={props.video.videoId} opts={opts} onReady={_onReady} />
		</div>
	)
}

export default Video

/*
		<div class="center">
			<YouTube
			  videoId={props.videoId}                  // defaults -> null 
			  id={string}                       // defaults -> null 
			  className={string}                // defaults -> null 
			  opts={obj}                        // defaults -> {} 
			  onReady={func}                    // defaults -> noop 
			  onPlay={func}                     // defaults -> noop 
			  onPause={func}                    // defaults -> noop 
			  onEnd={func}                      // defaults -> noop 
			  onError={func}                    // defaults -> noop 
			  onStateChange={func}              // defaults -> noop 
			  onPlaybackRateChange={func}       // defaults -> noop 
			  onPlaybackQualityChange={func}    // defaults -> noop 
			/>
		</div>
*/