import React, { createContext, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';

import { ContextType, LoginContext } from '../../App';
import { authUser } from '../../services/users.service';
import styles from './signin.module.scss';

export const SignIn = () => {
  const [isLogged, setLogged] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext<ContextType>(LoginContext);

  const handleClick = async () => {
    const user = await authUser({ username, password });
    setLogged(true);
    context.checkLogin({
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
