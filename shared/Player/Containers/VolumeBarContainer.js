import React, {Component} from 'react'

import VolumeBar from '../Components/VolumeBar'
import VolumeButton from '../Components/VolumeButton'

class VolumeBarContainer extends Component {

    constructor() {
        super()

        this.onVolumeBarChange = this.onVolumeBarChange.bind(this);
        this.toggleMute = this.toggleMute.bind(this);

        this.state = {
            muted: false
        }
    }

    onVolumeBarChange(value) {
        if (this.state.muted) {
            this.toggleMute();
        }

        const volume = value / 100;

        this.props.onChange(volume)
    }

    toggleMute() {
        this.setState({ muted: !this.state.muted })

        if (this.state.muted) {
            this.props.onUnmute();
        } else {
            this.props.onMute();
        }
    }

    render() {
        const {onChange, volume} = this.props;
        const {muted} = this.state;

        const value = volume * 100
        const isSilent = muted ? muted : volume <= 0.2
        return (
            <div className="volume-bar-container">
                <VolumeButton silent={isSilent} onClick={(e) => this.toggleMute()}/>
                <VolumeBar onChange={this.onVolumeBarChange} value={value}/>
            </div>
        )
    }

}

export default VolumeBarContainer