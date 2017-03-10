import React, {PropTypes}  from 'react';

export const Recorder = ({playing = false, onClick}) => (
    <div onClick={onClick}>
        {playing ? 'pause' : 'play'}
    </div>
);

Recorder.propTypes = {
    playing: PropTypes.bool,
    onClick: PropTypes.func
};

export default Recorder;