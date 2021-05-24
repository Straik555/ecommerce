//Core
import React, {useEffect, useState} from "react";

//Firebase
import {auth} from "../../../firebase";

//Style
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

//URL
import {URL} from '../../../url'

//Config
import {config} from "../../../_config";
import {useSelector} from "react-redux";

const Register = () => {
    const [email, setEmail] = useState('')
    const [pages, setPages] = useState(false)
    const {isLogin} = useSelector(state => ({...state.userReducer}))

    const handleSubmit = async (e) => {
        e.preventDefault();

        await auth.sendSignInLinkToEmail(email, config(URL.register))
        toast.success(`Email is sent to ${email}. Click the link to complete your registration.`)

    //  save user email in local storage
        window.localStorage.setItem('emailForRegistration', email)
    //    clear state
        setEmail('')
        setPages(true)

    }

    const registerForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className={'form-control'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoFocus
                    placeholder={'Your email'}
                />
                <br />

                <button type={'submit'} className={'btn btn-raised'}>
                    Register
                </button>
            </form>
        )
    }
    if(pages){
        return <Redirect to={'/login'} />
    }
    if(isLogin){
        return <Redirect to={'/'} />
    }
    return (
        <div className={'container p-5'}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    )
}

export default Register