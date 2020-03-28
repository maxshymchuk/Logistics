import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';

import { LoginContext } from '../../contexts/LoginContext';
import { authUser } from '../../services/users.service';
import styles from './signin.module.scss';

const SignIn = () => {
  const [isLogged, setLogged] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(LoginContext);

  const handleClick = async () => {
    const user = (await authUser({ username, password })).data;
    setLogged(true);
    context.login({
      user,
      isLogged: true
    });
  };

  return (
    <form className={styles.form}>
      <TextField
        label="Username"
        name="username"
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button color="primary" variant="contained" onClick={handleClick}>
        Sign In
      </Button>
      {isLogged && <Redirect to="/" />}
    </form>
  );
};

export default SignIn;