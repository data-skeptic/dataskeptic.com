import isEmpty from 'lodash/isEmpty';

import { cvv, cardMonth, cardYear, cardNumber, phone, email, numbers } from '../../../Forms/Validators';
import {TEXT, UPLOAD, RECORDING} from '../../Constants/CommentTypes';

export const ProposalFormValidator = (values) => {
    const errors = {};
    const {type} = values;


    switch (type) {
        case TEXT:
            if (!values.comment) {
                errors.comment = 'Required';
            } else {

            }
            break;

        case UPLOAD:
            if (values.files.length === 0) {
                errors.files = 'Please upload some files';
            }
            break;

        case RECORDING:
            if (!values.recording.id) {
                errors.recording = 'Please some upload files';
            }
            break;
    }

    if (!values.name) {
        errors.name = 'Please provide your name.';
    } else {

    }

    if (!values.email) {
        errors.email = 'Please provide your email address.';
    } else {
        if (!email(values.email)) {
            errors.email = 'Please provide a valid email address.';
        }
    }

    return errors;
};

export default ProposalFormValidator;