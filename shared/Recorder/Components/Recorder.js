import React, {PropTypes}  from 'react';
import classNames from 'classnames';

export const Recorder = ({recording = false, error, onClick, startComponent = 'Start', stopComponent = 'Stop'}) => (
    <div>
        <button className={classNames('btn btn-default btn-recorder', {'recording': recording})}
                type="button" onClick={onClick}
        >
            {recording ? stopComponent : startComponent }
        </button>

        { error ? <p className="text-danger">{error}</p> : null }
    </div>
);

Recorder.propTypes = {
    recording: PropTypes.bool,
    error: PropTypes.string,
    onClick: PropTypes.func,

    startComponent: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
    stopComponent: PropTypes.oneOf([PropTypes.node, PropTypes.string]),
};

export default Recorder;