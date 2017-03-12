import React, {PropTypes}  from 'react';
import classNames from 'classnames';

export const Recorder = ({playing = false, error, onClick}) => (
    <div>
        <button className="btn btn-default" type="submit" onClick={onClick}>
            {playing ? 'pause' : 'play'}
        </button>

        { error ? <p className="text-danger">{error}</p> : null }
    </div>
);

Recorder.propTypes = {
    playing: PropTypes.bool,
    error: PropTypes.string,
    onClick: PropTypes.func
};

export default Recorder;