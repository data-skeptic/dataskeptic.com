import React from 'react'
import classNames from 'classnames'

import PlayButton from './PlayButton'
import PauseButton from './PauseButton'

import ProposalLoading from '../../Proposals/Components/ProposalLoading/ProposalLoading'

const DisabledSymbol = () => <img src="/img/spinner.gif" width="14" height="14" />

export const TogglePlayButton = ({
  playing = false,
  proposalsDisabled = false,
  disabled = false,
  onClick
}) => {
  if (proposalsDisabled) {
    return <ProposalLoading />
  }

  return (
    <button
      className={classNames('player-btn', { disabled: disabled })}
      onClick={e => {
        e.preventDefault()
        if (disabled) return
        onClick(e)
      }}
    >
      {disabled ? (
        <DisabledSymbol />
      ) : playing ? (
        <PauseButton />
      ) : (
        <PlayButton />
      )}
    </button>
  )
}

export default TogglePlayButton
