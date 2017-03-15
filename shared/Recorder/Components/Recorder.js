import React, {PropTypes}  from 'react';
import classNames from 'classnames';

export const Recorder = ({recording = false, error, onClick}) => (
    <div>
        <button className="btn btn-default" type="button" onClick={onClick}>
            {recording ? 'Stop' : 'Start'}
        </button>

        { error ? <p className="text-danger">{error}</p> : null }
    </div>
);

Recorder.propTypes = {
    recording: PropTypes.bool,
    error: PropTypes.string,
    onClick: PropTypes.func
};

export default Recorder;