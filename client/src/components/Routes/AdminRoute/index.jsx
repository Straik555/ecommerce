// Core
import React, {useEffect, useState} from 'react';
import {Route} from 'react-router-dom';

//Redux
import {useSelector} from "react-redux";

//Function
import {currentAdmin} from '../../../functions/auth';

//LoadingToRedirect
import LoadingToRedirect from '../LoadingToRedirect';

const AdminRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state.userReducer}))
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(user && user.token){
            currentAdmin(user.token)
                .then(res => {
                    console.log('res', res)
                    setOk(true)
                })
                .catch(err => {
                    console.log('err', err)
                    setOk(false)
                })
        }
    }, [user])

    return ok ? <Route {...rest} /> : <LoadingToRedirect />
}

export default AdminRoute;