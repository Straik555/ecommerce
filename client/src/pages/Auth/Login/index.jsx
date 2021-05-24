//Core
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

//Firebase
import {auth, googleAuthProvider} from "../../../firebase";

//Style
import {toast} from "react-toastify";
import {Redirect} from "react-router-dom";
import {Button} from "antd";

//Icon
import {MailOutlined, GoogleOutlined} from '@ant-design/icons'

//Actions
import {userLogInFirebase} from "../../../_actions/actions";

//Redux
import {connect, useSelector} from "react-redux";

const Login = ({userLogInFirebase}) => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLogin} = useSelector(state => ({...state.userReducer}))

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async result => {
                const {user} = result
                const idTokenResult = await user.getIdTokenResult()
                userLogInFirebase(user, idTokenResult.token)
                toast.success(`Hello ${user.displayName}`)
            })
            .catch(error => {
                toast.error(error)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            userLogInFirebase(user, idTokenResult.token)
            toast.success(`Hello ${user.displayName ? user.displayName : user.email }`)
            // setPage(true)
        } catch (error){
            // setPage(false)
            setLoading(false)
            toast.error(error.message)
        }
    }
    if(isLogin){
        return <Redirect to={'/'} />
    }

    const loginForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        className={'form-control'}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        autoFocus
                        placeholder={'Your email'}
                    />
                </div>
                <div className="form-group">
                    <input
                        type='password'
                        className={'form-control'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={'Your password'}
                    />
                </div>
                <br />

                <Button
                    onClick={handleSubmit}
                    type={'primary'}
                    className={'mb-3'}
                    block
                    shape={'round'}
                    icon={<MailOutlined />}
                    size={'large'}
                    disabled={!email || password.length < 6}
                >
                    Login with email/Password
                </Button>
                <Button
                    onClick={googleLogin}
                    type={'danger'}
                    className={'mb-3'}
                    block
                    shape={'round'}
                    icon={<GoogleOutlined />}
                    size={'large'}
                >
                    Login with Google
                </Button>
                <Link
                    to={'/forgot/password'}
                    className={'float-right text-danger'}
                >
                    Forgot password
                </Link>
            </form>
        )
    }
        return (
        <div className={'container p-5'}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {
                        !loading ?
                            <h4>Login</h4> :
                            <h4 className={'text-danger'}>Loading...</h4>
                    }
                    {loginForm()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = () => {
    return{}
};

export default connect(mapStateToProps, {userLogInFirebase})(Login);