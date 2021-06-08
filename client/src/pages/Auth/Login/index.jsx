//Core
import React, {useState} from "react";
import {useHistory} from 'react-router-dom';

//Firebase
import {auth, googleAuthProvider} from "../../../firebase";

//Style
import {toast} from "react-toastify";

//Actions
import {userLogInFirebase} from "../../../_actions/actions";
import {IS_LOADING} from "../../../actionsType";

//Redux
import {connect, useDispatch} from "react-redux";

//Function
import {createOrUpdateUser, roleBasedRedirect} from '../../../functions/auth'

import {AuthLogin} from "./form";

const Login = ({userLogInFirebase}) => {
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async result => {
                const {user} = result
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
                        roleBasedRedirect(res, history);
                    })
                    .catch(error => console.log('ERROR', error))
                toast.success(`Hello ${user.displayName}`)
            })
            .catch(error => {
                toast.error(error)
            })
    }

    const handleSubmit = async (email, password) => {
        setLoading(true)
        try{
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    dispatch({
                        type: IS_LOADING
                    })
                   userLogInFirebase(
                       res.data._id,
                       res.data.name,
                       user.email,
                       idTokenResult.token,
                       res.data.role,
                       res.data.picture
                   )
                    roleBasedRedirect(res, history);
                })
                .catch(error => console.log('ERROR', error))

            toast.success(`Hello ${user.displayName ? user.displayName : user.email }`)
        } catch (error){
            setLoading(false)
            toast.error(error.message)
        }
    }

        return (
        <div className={'container p-5'}>
            <div className="row">
                <div className="col-md-6 offset-md-3">

                    {
                        !loading ? <h4>Login</h4> : <h4 className="text-danger">Loadding...</h4>
                    }

                    <AuthLogin
                        handleSubmitForm={handleSubmit}
                        googleLoginForm={googleLogin}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = () => {
    return{}
};

export default connect(mapStateToProps, {userLogInFirebase})(Login);