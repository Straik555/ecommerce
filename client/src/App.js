//Core
import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';

//Utils
import {routes} from "./routes";

//Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";


//Page
import Home from "./pages/Home";
import Header from "./components/nav/Header";

//Style
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const App = ({match}) => {
    console.log('match', match)
  return (
      <>
          <Header />
          <ToastContainer />
          <Switch>
              <Route exact path="/" render={() => (<Redirect to={routes.home} />)} />
              <Route exact path={routes.home} component={ () => <Home />} />
              <Route exact path={routes.login} component={ () => <Login />} />
              <Route exact path={routes.register} component={ () => <Register />} />
              <Route render={() => <h2>Page not found</h2>} />
          </Switch>
      </>
  )
}

export default App;