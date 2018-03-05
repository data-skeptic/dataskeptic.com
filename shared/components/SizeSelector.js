import React from 'react'

const SizeSelector = props => {
  if (props.sizes == undefined) {
    return <div />
  } else {
    return (
      <div>
        <select id={props.id} value={props.value} onChange={props.onChange}>
          <option key="default" value="default">
            {' '}
            -- Please select size --{' '}
          </option>
          {props.sizes.map(function(size, i) {
            return (
              <option key={i} value={size}>
                {size}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

export default SizeSelector
