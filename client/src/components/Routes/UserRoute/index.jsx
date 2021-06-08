// Core
import React from 'react';
import {Route} from 'react-router-dom';

//Redux
import {useSelector} from "react-redux";

//LoadingToRedirect
import LoadingToRedirect from '../LoadingToRedirect';

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector((state) => ({...state.userReducer}))

    return user && user.token ? <Route {...rest} render={() => children} /> : <LoadingToRedirect />
}

export default UserRoute;