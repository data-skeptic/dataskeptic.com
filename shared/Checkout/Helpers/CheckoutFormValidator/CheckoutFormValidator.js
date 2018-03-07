import isEmpty from 'lodash/isEmpty'

import {
  cvv,
  cardMonth,
  cardYear,
  cardNumber,
  phone,
  email,
  numbers
} from '../../../Forms/Validators'

const defaultValues = {
  // address
  first_name: '',
  last_name: '',
  street_1: '',
  street_2: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  phone: '',
  // card
  card_number: '',
  card_name: '',
  card_month: '',
  card_year: '',
  card_cvv: ''
}

export const CheckoutFormValidator = values => {
  const errors = {}

  // address
  if (isEmpty(values.first_name)) {
    errors.first_name = 'Please provide your first name'
  }

  if (isEmpty(values.last_name)) {
    errors.last_name = 'Please provide your last name'
  }

  if (isEmpty(values.street_1)) {
    errors.street_1 = 'Please provide shipping street address'
  }

  if (isEmpty(values.city)) {
    errors.city = 'Please provide city'
  }

  if (isEmpty(values.state)) {
    errors.state = 'Please provide state or province'
  }

  if (isEmpty(values.zip)) {
    errors.zip = 'Please provide postal code'
  } else {
    if (!numbers(values.zip)) {
      errors.zip = 'Invalid postal code'
    }
  }

  if (isEmpty(values.email)) {
    errors.email = 'Please provide email'
  } else {
    if (!email(values.email)) {
      errors.email = 'Invalid email'
    }
  }

  if (isEmpty(values.phone)) {
    errors.phone = 'Please provide phone number'
  } else {
  }

  // card
  if (isEmpty(values.card_number)) {
    errors.card_number = 'Please provide card number'
  } else {
    if (!cardNumber(values.card_number)) {
      errors.card_number = 'Invalid card number'
    }
  }

  if (isEmpty(values.card_name)) {
    errors.card_name = 'Please provide cardholder name'
  }

  if (isEmpty(values.card_month)) {
    errors.card_month = 'Please provide expiration month'
  } else {
    if (!cardMonth(values.card_month)) {
      errors.card_month = 'Invalid month'
    }
  }

  if (isEmpty(values.card_year)) {
    errors.card_year = 'Please provide expiration year'
  } else {
    if (!cardYear(values.card_year)) {
      errors.card_year = 'Invalid year'
    }
  }

  if (isEmpty(values.card_cvv)) {
    errors.card_cvv = 'Please provide Card CVV'
  } else {
    if (!cvv(values.card_cvv)) {
      errors.card_cvv = 'Invalid CVV format'
    }
  }

  return errors
}

export default CheckoutFormValidator
