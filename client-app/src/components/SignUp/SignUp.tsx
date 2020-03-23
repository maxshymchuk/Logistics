import cogoToast from 'cogo-toast';
import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';

import { UserSignUp } from '../../models/users.models';
import { regUser } from '../../services/users.service';
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
      <TextField label="Name" name="name" onChange={handleChange} required />
      <TextField
        label="Surname"
        name="surname"
        onChange={handleChange}
        required
      />
      <TextField
        label="Birthday"
        name="birthday"
        onChange={handleChange}
        required
      />
      <TextField label="E-mail" name="email" onChange={handleChange} required />
      <TextField label="Phone" name="phone" onChange={handleChange} />
      <TextField
        label="Username"
        name="username"
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        onChange={handleChange}
        required
      />
      <Button color="primary" variant="contained" onClick={handleClick}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUp;