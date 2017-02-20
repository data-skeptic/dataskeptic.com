import React from 'react'
import classNames from 'classnames'

export const Overflow = ({visible = false, onClick}) => (
    <div className={ classNames('overflow', {'visible': visible}) } onClick={onClick}></div>
)

export default Overflow