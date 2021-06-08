//Core
import React, {useEffect} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

//Utils
import {routes} from "./components/Routes";

//Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RegisterComplete from "./pages/Auth/RegisterComplete";
import ForgotPassword from "./pages/Auth/ForgotPassword";

//Page
import Home from "./pages/Home";
import Header from "./components/nav/Header";

import History from "./pages/User/History";
import Password from "./pages/User/Password";
import Wishlist from "./pages/User/Wishlist";

import AdminDashboard from './pages/Admin/Dashboard';
import AdminCategory from "./pages/Admin/Category";
import AdminCoupon from "./pages/Admin/Coupon";
import AdminProduct from "./pages/Admin/Product";
import AdminSub from "./pages/Admin/Sub";
import CategoryUpdate from "./pages/Admin/Category/CategoryUpdate";

//Style
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Spinner from "./components/Spinner";

//Actions
import {userLogInFirebase} from "./_actions/actions";

//Firebase
import {auth} from "./firebase";

//Function
import {currentUser} from './functions/auth'

//UserRoute
import UserRoute from "./components/Routes/UserRoute";
import AdminRoute from "./components/Routes/AdminRoute";

const App = ({userLogInFirebase, isLoading}) => {
    //to check firebase auth state
//    use useDispatch with redux
     useEffect(() => {
         const unsubscribe = auth.onAuthStateChanged(async (user) => {
             if(user){
                 const idTokenResult = await user.getIdTokenResult()
                 currentUser(idTokenResult.token)
                     .then(res => {
                         userLogInFirebase(
                             res.data._id,
                             res.data.name,
                             user.email,
                             idTokenResult.token,
                             res.data.role,
                             res.data.picture)
                     })
                     .catch(error => console.log('ERROR', error))
             }
         });
     //    cleanup

         return () => unsubscribe()
     }, [userLogInFirebase])
    return (
        <div className="container">
              <Header />
              <ToastContainer />
            {
                isLoading ? <Spinner /> :
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to={routes.home} />)} />
                        <Route exact path={routes.home} component={ () => <Home />} />
                        <Route exact path={routes.login} component={ () => <Login />} />
                        <Route exact path={routes.register} component={ () => <Register />} />
                        <Route exact path={routes.registerComplete} component={ () => <RegisterComplete />} />
                        <Route exact path={routes.forgotPassword} component={() => <ForgotPassword />} />
                        <UserRoute exact path={routes.history} component={() => <History />} />
                        <UserRoute exact path={routes.password} component={() => <Password />} />
                        <UserRoute exact path={routes.wishlist} component={() => <Wishlist />} />
                        <AdminRoute exact path={routes.adminDashboard} component={() => <AdminDashboard />} />
                        <AdminRoute exact path={routes.adminCategory} component={() => <AdminCategory />} />
                        <AdminRoute exact path={routes.adminSub} component={() => <AdminSub />} />
                        <AdminRoute exact path={routes.adminCoupon} component={() => <AdminCoupon />} />
                        <AdminRoute exact path={routes.adminProduct} component={() => <AdminProduct />} />
                        <AdminRoute exact path={routes.adminCategoryUpdate} component={() => <CategoryUpdate />} />
                    </Switch>
            }

        </div>
    )
}

const mapStateToProps = ({userReducer: {isLoading}}) => {
    return {isLoading}
}

export default connect(mapStateToProps, {userLogInFirebase})(App);