import { Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MessageType } from '../../../../models/message.models';
import { AppContext } from '../../../../stores/AppStore';
import styles from './signin.module.scss';

const SignIn = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isFilled, setFilled] = useState(false);

  const appStore = useContext(AppContext);

  useEffect(() => {
    setFilled(!!username && !!password);
  }, [username, password]);

  const handleClick = async () => {
    const response = await appStore.login(username, password);
    if (response.messageType === MessageType.Error) {
      appStore.setNotify(response);
    }
  };

  return (
    <form className={styles.form}>
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        size="small"
        onChange={e => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        variant="outlined"
        size="small"
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button color="primary" variant="contained" onClick={handleClick} disabled={!isFilled}>
        Sign In
      </Button>
      {appStore.isLogged && <Redirect to="/" />}
    </form>
  );
});

export default SignIn;