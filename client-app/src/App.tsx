import "./app.scss";

import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Menu } from "./components/Menu/Menu";
import {
  CallbackContextType,
  defaultContext,
  LoginContext
} from "./components/SignIn/SignIn";
import { User } from "./models/users.models";
import { Admin } from "./pages/Admin/Admin";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home/Home";
import CreateOrder from "./pages/Orders/CreateOrder/CreateOrder";
import TrackOrder from "./pages/Orders/TrackOrder/TrackOrder";

// import { createStore } from 'redux';
// import { appReducer } from './reducers';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// const store = createStore(appReducer);

export const App = () => {
  const changeState = (context: CallbackContextType) => {
    console.log(context.isLogged);
    setLoginState({
      ...loginState,
      user: context.user,
      isLogged: context.isLogged
    });
  };

  const [loginState, setLoginState] = useState({
    user: {} as User | undefined,
    isLogged: false,
    checkLogin: changeState
  });

  return (
    <LoginContext.Provider value={loginState}>
      <Router>
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route path="/" component={Menu} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Auth} />
          <Route path="/create" component={CreateOrder} />
          <Route path="/track" component={TrackOrder} />
        </Switch>
      </Router>
    </LoginContext.Provider>
  );
};
