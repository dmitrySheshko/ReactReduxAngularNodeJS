import Validator from 'validator';
import { isEmpty } from 'lodash';

export default function validation(data) {
    let errors = {};

    if (Validator.isEmpty(data.login)) {
        errors.login = 'This field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}