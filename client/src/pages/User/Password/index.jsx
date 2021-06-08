//Core
import React, {useState} from "react";

//Firebase
import {auth} from "../../../firebase";

//Wrapper
import WrapperNavLink from "../../../components/WraperNavLink";

//Nav
import UserNav from "../../../components/nav/UserNav";

//Style
import {toast} from "react-toastify";
import Spinner from "../../../components/Spinner";

const Password = () => {
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        await auth.currentUser.updatePassword(password)
            .then(() => {
                setPassword('')
                setLoading(false)
                toast.success('Password successfully update ')
            })
            .catch(error => {
                setLoading(false)
                toast.error(error.message)
            })
    }

    const passwordUpdateForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor={'password'}>Password</label>
                    <input
                        id={'password'}
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        className={'form-control'}
                        placeholder={'Enter new password'}
                        disabled={loading}
                        value={password}
                    />
                </div>
                <button
                    className="btn btn-primary"
                    disabled={!password || password.length < 6}
                >
                    Submit
                </button>
            </form>
        )
    }

    return  (
        <WrapperNavLink nav={<UserNav />}>
            {
                loading && <Spinner />
            }
            <h4>Password Update</h4>
            {passwordUpdateForm()}
        </WrapperNavLink>
    )
}

export default Password;