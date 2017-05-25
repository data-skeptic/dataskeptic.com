import React, {Component} from 'react'

import VolumeBar from '../Components/VolumeBar'
import VolumeButton from '../Components/VolumeButton'

class VolumeBarContainer extends Component {

    constructor() {
        super()
    }

    render() {
        return (
            <div className="volume-bar-container">
                <VolumeButton silent={false}/>
                <VolumeBar/>
            </div>
        )
    }

}

export default VolumeBarContainer