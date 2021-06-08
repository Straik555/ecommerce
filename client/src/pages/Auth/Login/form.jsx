// Core
import React from 'react';
import {Link} from "react-router-dom";

//Formik
import {Formik, Form} from "formik";

//Input
import {TextField} from "../../../components/TextField";

//Validation
import {validateLogin} from "../../../Utils/Validation";

//Style
import { Icon } from 'react-icons-kit'
import {ic_mail_outline} from 'react-icons-kit/md/ic_mail_outline';
import {google} from 'react-icons-kit/icomoon/google';
import './style.css'

const IconForm = ({icon}) => {
    return(
        <Icon
            size={24}
            style={{
                'color': '#ffffff',
                'marginRight': '10px'
            }}
            icon={icon}
        />
    )
}

export const AuthLogin = ({handleSubmitForm, googleLoginForm}) => {
    const handle = (values) => {
        handleSubmitForm(values.email, values.password)
    }
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validateOnBlur
            onSubmit={values => handle(values)}
            validationSchema={validateLogin}
        >
            {
                formik => (
                    <div>
                        <Form>
                            <TextField label={'email'} name={'email'} type={'email'}  />
                            <TextField label={'password'} name={'password'} type={'password'} />
                            <button
                                type={'submit'}
                                className={'button handler'}
                            >
                                <IconForm icon={ic_mail_outline} />Login with email/Password
                            </button>
                        </Form>
                        <button
                            className={'button google'}
                            onClick={googleLoginForm}
                        >
                            <IconForm icon={google} /> Login with Google
                        </button>
                        <Link
                            to={'/forgot/password'}
                            className={'link'}
                        >
                            Forgot password
                        </Link>
                    </div>
                )
            }
        </Formik>
    )
}