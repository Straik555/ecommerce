//Core
import React, {useState} from "react";

//Firebase
import {auth} from "../../../firebase";

//Style
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";

//URL
import {URL} from '../../../url'

const Register = () => {

    const [email, setEmail] = useState('')
    const [pages, setPages] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            url: URL.register,
            handleCodeInApp: true,
        };
        await auth.sendSignInLinkToEmail(email, config)
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
                />

                <button type={'submit'} className={'btn btn-raised'}>
                    Register
                </button>
            </form>
        )
    }
    if(pages){
        return <Redirect to={'/login'} />
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