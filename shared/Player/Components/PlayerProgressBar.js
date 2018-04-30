import React from 'react'
import ReactDOM from 'react-dom'
import Rcslider from 'rc-slider'
import { connect } from 'react-redux'

class PlayerProgressBar extends React.Component {
  static defaultProps = {
    disabled: false
  }

  constructor(props) {
    super(props)
  }

  onUpdate(pos) {
    this.props.onChange(pos)
  }

  render() {
    const { disabled } = this.props

    return (
      <div className="player-progress-bar">
        <Rcslider
          min={0}
          max={100}
          range={false}
          defaultValue={this.props.progress}
          value={this.props.progress}
          disabled={disabled}
          onChange={this.onUpdate.bind(this)}
        />
      </div>
    )
  }
}

export default connect(state => ({ player: state.player }))(PlayerProgressBar)
