import React, {PropTypes} from 'react';

const FilePreview = ({file}) => (
    <div className="upload-file-item-box col-xs-6 col-md-3">
        <div className="thumbnail">
            <img src={file.preview} />
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
    </div>
);

FilePreview.propTypes = {

};

export default FilePreview;