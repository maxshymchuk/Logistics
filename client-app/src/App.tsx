import './app.scss';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './components/Menu/Menu';
import { defaultLoginState, LoginContext, LoginContextState } from './contexts/LoginContext';
import Admin from './pages/Admin/Admin';
import Auth from './pages/Auth/Auth';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Index from './pages/Index/Index';
import OrderCreate from './pages/Orders/OrderCreate/OrderCreate';
import TrackOrder from './pages/Orders/TrackOrder/TrackOrder';
import Profile from './pages/Profile/Profile';
import { getLoggedUser, logoutUser } from './services/users.service';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const App = () => {
  const [loginState, setLoginState] = useState<LoginContextState>(defaultLoginState);

  const login = (newState: LoginContextState) => {
    setLoginState({
      user: newState.user,
      isLogged: newState.isLogged
    });
  };

  const logout = async () => {
    setLoginState({
      user: defaultLoginState.user,
      isLogged: defaultLoginState.isLogged
    });
    await logoutUser();
  };

  useEffect(() => {
    (async () => {
      const userData = (await getLoggedUser()).data;
      setLoginState({
        user: userData ?? undefined,
        isLogged: !!userData
      });
    })();
  }, []);

  return (
    <LoginContext.Provider value={{...loginState, login, logout}}>
      <Router>
        <Switch>
          <Route path="/admin" component={undefined} />
          <Route path="/" component={Menu} />
        </Switch>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route exact path="/" component={Index} />
          <Route exact path="/login" component={Auth} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/create" component={OrderCreate} />
          <Route exact path="/track" component={TrackOrder} />
          <Route path="*" component={ErrorPage} />
        </Switch>
      </Router>
    </LoginContext.Provider>
  );
};

export default App;