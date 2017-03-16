import React, {PropTypes} from 'react';

export const AudioLevel = ({children}) => (
    <div>
        {children}
    </div>
);

AudioLevel.propTypes = {
    children: PropTypes.node
};

export default AudioLevel;
