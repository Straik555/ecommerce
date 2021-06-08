// Core
import * as yup from 'yup';

export const validateLogin = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Required field'),
    password: yup.string()
        .required('Required field')
        .min(6, 'Password must be at less 6 characters'),
})

export const validateRegister = yup.object().shape({
    email: yup.string()
        .email('Invalid email format')
        .required('Required field'),
})

export const validateRegisterComplete = yup.object().shape({
    password: yup.string()
        .required('Required field')
        .min(6, 'Password must be at less 6 characters'),
})

export const validateCategoryAdmin = yup.object().shape({
    name: yup.string()
        .typeError('Should be a string')
        .max(15, 'Must be 15 characters or less')
        .required('Required field'),
})