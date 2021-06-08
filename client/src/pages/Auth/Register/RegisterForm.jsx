// Core
import React from 'react';

//Formik
import {Formik, Form} from "formik";

//Input
import {TextField} from "../../../components/TextField";

//Validation
import {validateRegister} from "../../../Utils/Validation";

//Style
import './style.css'

export const AuthRegister = ({handleSubmitForm}) => {
    const handle = (values) => {
        handleSubmitForm(values.email)
    }
    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validateOnBlur
            onSubmit={values => handle(values)}
            validationSchema={validateRegister}
        >
            {
                formik => (
                    <div>
                        <Form>
                            <TextField
                                label={'email'}
                                name={'email'}
                                type={'email'}
                            />
                            <button
                                type={'submit'}
                                className={'register'}
                            >
                                Register
                            </button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}