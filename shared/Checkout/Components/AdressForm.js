import React from 'react';

import CountrySelector from '../../Common/Components/CountrySelector';

export const AddressForm = ({ title='Shipping Information', address = {} }) => (
    <div className="address-form-container">
        <div className="address-form">
            <div className="shipping-address-title">{title}</div>

            <div className="row no-clear">
                <div className="col-md-6">
                    <div className="address-label">First name <span className="required">*</span></div>
                    <div className="">
                        <input autoFocus={true} type="text" className="address-input first_name" ref="first_name" value={address.first_name} placeholder="John"/>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="address-label">Last name <span className="required">*</span></div>
                    <div className="">
                        <input type="text" className="address-input last_name" ref="last_name" value={address.last_name} placeholder="Smith"/>
                    </div>
                </div>
            </div>

            <div className="row no-clear">
                <div className="col-md-8">
                    <div className="address-label">Street Address <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input street_1" type="text" ref="street_1" value={address.street_1} placeholder="123 Main Street"/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="address-label">Apt, suite, etc.</div>
                    <div className="">
                        <input className="address-input street_2" type="text" ref="street_2" value={address.street_2} placeholder="Apt 101"/>
                    </div>
                </div>
            </div>

            <div className="row no-clear">
                <div className="col-md-12">
                    <div className="address-label">City / Town <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input city" type="text" ref="city" value={address.city} placeholder="Los Angeles"/>
                    </div>
                </div>
            </div>

            <div className="row no-clear">
                <div className="col-md-5">
                    <div className="address-label">Country <span className="required">*</span></div>
                    <div className=""><CountrySelector /></div>
                </div>
                <div className="col-md-4">
                    <div className="address-label">State / Province <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input state" type="text" ref="state" value={address.state} />
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="address-label">Zip Code <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input zip" type="text" ref="zip" value={address.zip} placeholder="12345"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="address-label">Email <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input email" type="text" ref="email" value={address.email}  placeholder="j.smith@work.com"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="address-label">Phone <span className="required">*</span></div>
                    <div className="">
                        <input className="address-input phone" type="text" ref="phone" value={address.phone} placeholder="(310) 313 - 3413"/>
                    </div>
                </div>
            </div>

        </div>
    </div>
);

export default AddressForm;