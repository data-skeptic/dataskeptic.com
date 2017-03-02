import React from 'react';

import AddressForm from './AdressForm';
import CreditCardForm from './CreditCardForm';

export const CheckoutForm = () => (
    <div>
        <AddressForm />
        <CreditCardForm />
    </div>
);

export default CheckoutForm;