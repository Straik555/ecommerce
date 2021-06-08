//Core
import React from 'react';
import {useField, ErrorMessage} from "formik";

//Style
import './style.css'

export const TextField = ({label, validator, setValue, ...props}) => {
    const [field, meta] = useField(props)
    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '400px'}}>
            <input
                style={meta.touched && meta.error ? {border: '1px solid red !important'} : null}
                type="text"
                className={'input'}
                placeholder={`Your ${field.name}`}
                {...field}
                {...props}
            />
            <ErrorMessage
                component="span"
                name={field.name}
                style={{color: 'red'}}
            />
        </div>
    )
}