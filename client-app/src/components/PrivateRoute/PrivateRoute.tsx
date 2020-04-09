import React from 'react';
import { Route } from 'react-router-dom';

import Error403 from '../../pages/ErrorPages/Error403/Error403';
import appStore from '../../stores/AppStore';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        appStore.isLogged ? <Component {...props} /> : <Error403 /> // <Redirect to='/login' />
      )}
    />
  );
};

export default PrivateRoute;