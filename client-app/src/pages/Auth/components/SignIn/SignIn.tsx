import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';

import { isOfType } from '../../../../helpers/typeGuard';
import { MessageType } from '../../../../models/message.models';
import { User } from '../../../../models/user.models';
import { authUser } from '../../../../services/users.service';
import appStore from '../../../../stores/AppStore';
import styles from './signin.module.scss';

const SignIn = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    const userResponse = await authUser({ username, password });
    if (userResponse.messageType === MessageType.Error) {
      console.log(userResponse.message);
    } else if (isOfType<User>(userResponse.data, 'username')) {
      appStore.login(userResponse.data);
    }
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
      {appStore.isLogged && <Redirect to="/" />}
    </form>
  );
});

export default SignIn;