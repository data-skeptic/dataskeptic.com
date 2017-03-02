import React from 'react';
import { renderField } from '../../Forms/Components/Field/Field';

export const CreditCard = ({ title = 'Billing Details' }) => (
    <div className="credit-cart-form">
        <div className="shipping-address-title">{title}</div>
        <div className="">
            <form>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-label">Credit Card Number <span className="required">*</span></div>
                        <input id="cc-n" type='text' placeholder='4242 4242 4242 4242' />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="card-label">Cardholder Name <span className="required">*</span></div>
                        <input id="cc-m" type='text' placeholder='John A. Smith' />
                    </div>
                    <div className="col-md-2">
                        <div className="card-label">Mon <span className="required">*</span></div>
                        <input id="cc-y" type='text' placeholder='02' />
                    </div>
                    <div className="col-md-2">
                        <div className="card-label">Year <span className="required">*</span></div>
                        <input id="cc-y" type='text' placeholder='19' />
                    </div>
                    <div className="col-md-3">
                        <div className="card-label">CVV <span className="required">*</span></div>
                        <input id="cc-c" type='text' placeholder='123' /><br />
                    </div>
                </div>

                <div className="row complete-btn">
                    <div className="col-md-12">
                        <input className="btn" type="submit" value='Complete Order' />
                    </div>
                </div>

            </form>
        </div>
    </div>
);

export default CreditCard;