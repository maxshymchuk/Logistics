import { Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { isOfType } from '../../../../helpers/typeGuard';
import { MessageType } from '../../../../models/message.models';
import { User } from '../../../../models/user.models';
import { authUser } from '../../../../services/users.service';
import { AppContext } from '../../../../stores/AppStore';
import styles from './signin.module.scss';

const SignIn = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const appStore = useContext(AppContext);

  const handleClick = async () => {
    const response = await authUser({ username, password });
    if (response.messageType === MessageType.Error) {
      appStore.setNotify(response);
    } else if (isOfType<User>(response.data, 'username')) {
      appStore.login(response.data);
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
      <Button color="primary" variant="contained" onClick={handleClick}>
        Sign In
      </Button>
      {appStore.isLogged && <Redirect to="/" />}
    </form>
  );
});

export default SignIn;