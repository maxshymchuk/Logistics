import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import axios from 'axios';
import { observer } from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './app.scss';

import Menu from './components/Menu/Menu';
import Notification1 from './components/Notification/Notification1';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Admin from './pages/Admin/Admin';
import Auth from './pages/Auth/Auth';
import Error404 from './pages/ErrorPages/Error404/Error404';
import Index from './pages/Index/Index';
import OrderCreate from './pages/Orders/OrderCreate/OrderCreate';
import OrderTrack from './pages/Orders/OrderTrack/OrderTrack';
import Profile from './pages/Profile/Profile';
import { AppContext } from './stores/AppStore';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7425CE',
      main: '#4E008E',
      dark: '#300068'
    },
    secondary: {
      light: '#F76BA4',
      main: '#F20057',
      dark: '#B20049'
    }
  }
});

const App = observer(() => {
  const appStore = useContext(AppContext);

  useEffect(() => {
    (async () => {
      await appStore.requestIsLog();
    })();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <AppContext.Provider value={appStore}>
        {appStore.notifier && <Notification1 {...appStore.notifier} />}
        {appStore.isRequestLoginStatus ? (
          null
        ) : (
          <Router>
            <Switch>
              <Route path="/admin" component={undefined} />
              <Route path="/" component={Menu} />
            </Switch>
            <Switch>
              <PrivateRoute path="/admin" component={Admin} />
              <Route exact path="/" component={Index} />
              <Route exact path="/login" component={Auth} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/create" component={OrderCreate} />
              <Route exact path="/track" component={OrderTrack} />
              <Route path="*" component={Error404} />
            </Switch>
          </Router>
        )}
      </AppContext.Provider>
    </MuiThemeProvider>
  );
});

export default App;