import React, {PropTypes} from 'react';

import {Field} from 'redux-form';
import {renderField} from '../../../Forms/Components/Field/Field';

export const UserInfoBox = () => (
    <div>
        <Field label="Name" component={renderField} name="name" type="text" className="contact-name" placeholder="John Smith" autocomplete="false" />
        <Field label="Email" component={renderField} name="email" type="email" className="contact-name" placeholder="j.smith@work.com" autocomplete="false" />
    </div>
);

UserInfoBox.propTypes = {};

export default UserInfoBox;