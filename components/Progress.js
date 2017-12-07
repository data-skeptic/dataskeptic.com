import React, {Component} from 'react'
import styled from 'styled-components'
import Rcslider from "rc-slider"
export default class Progress extends React.Component {
  constructor(props) {
    super(props)
  }

  onUpdate = (position) => {
    this.props.onChange(position);
  }

  render() {
    return (
      <ProgressWrapper>
        <Rcslider
          min={0}
          max={100}
          range={false}
          defaultValue={this.props.progress}
          value={this.props.progress}
          disabled={false}
          onChange={this.onUpdate}
        />
      </ProgressWrapper>
    )
  }
}


const ProgressWrapper = styled.div`
      margin-left: 50px;
    margin-right: 50px;
    padding: 9px;
  & > .rc-slider {
  height: 2px;
  background: #D7D9D9;
}

& .rc-slider-track {
  background: #F4E26E;
}

& .rc-slider-handle {
  background-color: #F4E26E;
  z-index: 2;
  box-shadow: 0px 0px 0px 6px rgba(244, 226, 110, 0.5);
  padding: 4px;
  border: none;
  /*TODO: add transition to scale, disable for left*/
  transition: 300ms;
  transition-property: transform;
}
& .rc-slider-rail {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
& .rc-slider-step {
    position: absolute;
    width: 100%;
    height: 4px;
    background: transparent;
    z-index: 1;
}
`