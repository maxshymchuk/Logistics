import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';
import Error403 from '../../pages/ErrorPages/Error403/Error403';

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isLogged } = useContext(LoginContext);

  return (
    <Route {...rest} render={(props) => (
      isLogged ? <Component {...props} /> : <Error403 /> //<Redirect to='/login' />
    )} />
  )
}

export default PrivateRoute;