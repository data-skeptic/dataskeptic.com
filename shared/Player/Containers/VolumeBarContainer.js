import React, {Component} from 'react'

import VolumeBar from '../Components/VolumeBar'
import VolumeButton from '../Components/VolumeButton'

class VolumeBarContainer extends Component {

    constructor() {
        super()

        this.onVolumeBarChange = this.onVolumeBarChange.bind(this);
    }

    onVolumeBarChange(value) {
        const volume = value / 100;

        this.props.onChange(volume)
    }

    render() {
        const {onChange, value} = this.props;

        return (
            <div className="volume-bar-container">
                <VolumeButton silent={false}/>
                <VolumeBar onChange={this.onVolumeBarChange} value={value}/>
            </div>
        )
    }

}

export default VolumeBarContainer