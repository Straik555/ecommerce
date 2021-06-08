//Core
import React, {useState, useEffect} from "react";
import {useHistory, Redirect} from 'react-router-dom'

//Style
import {toast} from "react-toastify";

//Auth
import {auth} from "../../firebase";

//Actions
import {userLogInFirebase} from "../../_actions/actions";

//Redux
import {connect} from "react-redux";

//Function
import {createOrUpdateUser} from '../../functions/auth'

const RegisterComplete = ({isLogin, userLogInFirebase}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    useEffect(() => {
        setEmail(localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if(!email || !password){
            toast.error('Email and password is required')
            return
        }
        if(password.length < 6){
            toast.error('Password must be at least 6 characters long')
            return
        }
        try{
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href);
            // console.log('res', result)
            if(result.user.emailVerified){
            //    remove user email for local storage
                localStorage.removeItem('emailForRegistration');
            //    get user id token
                const user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        userLogInFirebase(
                            res.data._id,
                            res.data.name,
                            user.email,
                            idTokenResult.token,
                            res.data.role,
                            res.data.picture
                        )
                    })
                    .catch(error => console.log('ERROR', error))
            // style message
                toast.success('Password set successfully')
            //    redirect
                history.push('/')
            }
        } catch (error){
            // style message
                toast.error(error.message)
        }
    }

    const completeRegistrationForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    className={'form-control'}
                    value={email}
                    disabled
                />
                <input
                    type="password"
                    className={'form-control'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={'Password'}
                    autoFocus
                />

                <button type={'submit'} className={'btn btn-raised'}>
                    Complete Register
                </button>
            </form>
        )
    }

    if(isLogin){
        return <Redirect to={'/'} />
    }

    return (
        <div className={'container p-5'}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({userReducer:{isLogin}}) => {
    return {isLogin}
}

export default connect(mapStateToProps, {userLogInFirebase})(RegisterComplete);