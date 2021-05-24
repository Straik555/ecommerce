//Core
import React, {useEffect} from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

//Utils
import {routes} from "./routes";

//Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RegisterComplete from "./pages/Auth/RegisterComplete";
import ForgotPassword from "./pages/Auth/ForgotPassword";

//Page
import Home from "./pages/Home";
import Header from "./components/nav/Header";

//Style
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

//Actions
import {userLogInFirebase} from "./_actions/actions";

//Firebase
import {auth} from "./firebase";

const App = ({userLogInFirebase}) => {
    //to check firebase auth state
//    use useDispatch with redux
     useEffect(() => {
         const unsubscribe = auth.onAuthStateChanged(async (user) => {
             if(user){
                 const idTokenResult = await user.getIdTokenResult()
                 userLogInFirebase(user, idTokenResult.token)
             }
         });
     //    cleanup
         
         return () => unsubscribe()
     }, [])
    return (
          <>
              <Header />
              <ToastContainer />
              <Switch>
                  <Route exact path="/" render={() => (<Redirect to={routes.home} />)} />
                  <Route exact path={routes.home} component={ () => <Home />} />
                  <Route exact path={routes.login} component={ () => <Login />} />
                  <Route exact path={routes.register} component={ () => <Register />} />
                  <Route exact path={routes.registerComplete} component={ () => <RegisterComplete />} />
                  <Route exact path={routes.forgotPassword} component={() => <ForgotPassword />} />
            </Switch>
        </>
    )
}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, {userLogInFirebase})(App);