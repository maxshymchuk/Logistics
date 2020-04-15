import cogoToast from 'cogo-toast';
import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';

import { UserSignUp } from '../../../../models/user.models';
import { regUser } from '../../../../services/users.service';
import styles from './signup.module.scss';

const SignUp = () => {
  const [user, setUser] = useState<UserSignUp>(Object);

  const handleClick = async () => {
    const res = await regUser(user);
    cogoToast.success(res, {
      position: 'bottom-right'
    });
  };

  const handleChange = (e: any) => {
    setUser({ ...user, name: e.target.value });
  };

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <TextField
          label="Name"
          name="name"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
        <TextField
          label="Surname"
          name="surname"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.row}>
        <TextField
          label="Birthday"
          name="birthday"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
        <TextField
          label="E-mail"
          name="email"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.row}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          variant="outlined"
          size="small"
          onChange={handleChange}
          required
        />
      </div>
      <TextField label="Phone" name="phone" variant="outlined" size="small" onChange={handleChange} />
      <Button color="primary" variant="contained" onClick={handleClick}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;