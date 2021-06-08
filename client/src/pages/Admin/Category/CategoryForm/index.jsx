// Core
import React, {useState} from "react";

//Formik
import {Formik, Form} from "formik";

//Input
import {TextField} from "../../../../components/TextField";
import {validateCategoryAdmin} from "../../../../Utils/Validation";

export const CategoryForm = ({handleSubmitForm, names}) => {
    const handleSubmit = (values) => {
        handleSubmitForm(values.name)
    }
    return (
        <Formik
            initialValues={{
                name: '',
            }}
            validateOnBlur
            onSubmit={values => handleSubmit(values)
            }
            validationSchema={validateCategoryAdmin}

        >
            {
                formik => (
                    <div>
                        <Form>
                            <TextField
                                label={'name'}
                                name={'name'}
                                type={'name'}
                                className={'form-control'}
                                value={formik.values.name ? formik.values.name : names}
                            />
                            <button
                                type={'submit'}
                                className={'btn btn-outline-primary mt-3'}
                            >
                                Save
                            </button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}