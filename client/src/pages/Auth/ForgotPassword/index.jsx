//Core
import React, {useState, useEffect} from "react";

//Router
import {Redirect} from 'react-router-dom'

//Firebase
import {auth} from "../../../firebase";

//Redux
import {useSelector} from "react-redux";

//Style
import {toast} from "react-toastify";

//URL
import {URL} from "../../../url";

//Config
import {config} from "../../../_config";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(false)
    const {user} = useSelector(state => ({...state.userReducer}))

    useEffect(() => {
        if(user && user.token ){
            setPage(true)
        }
    }, [user])

    const handlerForgotPassword = async (e) => {
        e.preventDefault()

        await auth.sendPasswordResetEmail(email, config(URL.forgotPassword))
            .then(res => {
                setEmail('')
                setLoading(false)
                toast.success('Check your email for password reset link')
                console.log('res', res)
            }).catch(error => {
                setLoading(false);
                toast.error(error.message);
            })
    }

    if(page){
        return <Redirect to={'/'}/>
    }

    return (
        <div className={'container col-md-6 offset-md-3 p-5'}>
            {
                loading ?
                    <h4 className={'text-danger'}>Loading...</h4> :
                    <h4>Forgot Password</h4>
            }
            <form onSubmit={handlerForgotPassword}>
                <input
                    type="email"
                    className={'form-control'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={'Type your email'}
                />
                <button
                    className={'btn btn-raised'}
                    disabled={!email}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword;