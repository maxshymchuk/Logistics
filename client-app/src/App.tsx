import './app.scss';

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Menu } from './components/Menu/Menu';
import { User } from './models/users.models';
import { Admin } from './pages/Admin/Admin';
import { Auth } from './pages/Auth/Auth';
import { Index } from './pages/Index/Index';
import CreateOrder from './pages/Orders/CreateOrder/CreateOrder';
import TrackOrder from './pages/Orders/TrackOrder/TrackOrder';
import { Profile } from './pages/Profile/Profile';
import { getLoggedUser, logout } from './services/users.service';

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export const scrollOffset = (el: Element) => {
  const Y_OFFSET = -50;
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset; 
  window.scrollTo({ top: yCoordinate + Y_OFFSET, behavior: 'smooth' }); 
}

export type CallbackContextType = {
  user: User | undefined;
  isLogged: boolean;
};

export type ContextType = CallbackContextType & {
  checkLogin: (value: CallbackContextType) => void;
  logout: () => void;
};

const defaultLoginContext = {
  user: undefined,
  isLogged: false,
  checkLogin: () => {},
  logout: async () => await logout()
}

export const LoginContext = createContext<ContextType>(defaultLoginContext);

export const App = () => {
  const changeState = (newState: CallbackContextType) => {
    setLoginState({
      ...loginState,
      user: newState.user,
      isLogged: newState.isLogged
    });
  };

  const [loginState, setLoginState] = useState<ContextType>({
    ...defaultLoginContext,
    checkLogin: changeState
  });

  useEffect(() => {
    (async () => {
      const user = await getLoggedUser();
      setLoginState({
        ...defaultLoginContext,
        user: Object.keys(user).length ? user : undefined,
        isLogged: !!Object.keys(user).length,
        checkLogin: changeState
      });
    })()
  }, [])
  

  return (
    <LoginContext.Provider value={loginState}>
      <Router>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Menu} />
        </Switch>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Auth} />
          <Route path="/profile" component={Profile} />
          <Route path="/create" component={CreateOrder} />
          <Route path="/track" component={TrackOrder} />
        </Switch>
      </Router>
    </LoginContext.Provider>
  );
};
