import React from 'react'
import classNames from 'classnames'

export const Overflow = ({visible = false}) => (
    <div className={ classNames('overflow', {'visible': visible}) }></div>
)

export default Overflow