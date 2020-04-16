import DateFnsUtils from '@date-io/date-fns';
import { Button, TextField } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { MessageType } from '../../../../models/message.models';

import { User } from '../../../../models/user.models';
import { AppContext } from '../../../../stores/AppStore';
import styles from './signup.module.scss';

const SignUp = () => {
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    birthday: new Date(),
    email: '',
    username: '',
    password: '',
    phone: '',
    isAdmin: false
  });
  const [isFilled, setFilled] = useState(false);
  const [isReg, setReg] = useState(false);

  const appStore = useContext(AppContext);

  const isRequiredFilled = () => {
    return !!user.name
      && !!user.surname
      && !!user.birthday
      && !!user.email
      && !!user.username
      && !!user.password;
  };

  useEffect(() => {
    setFilled(isRequiredFilled());
  }, [user]);

  const handleClick = async () => {
    const response = await appStore.register(user);
    if (response.messageType === MessageType.Error) {
      appStore.setNotify(response);
    }
    setReg(true);
  };

  const handleDate = (date: MaterialUiPickersDate) => {
    const newDate = date?.getTime();
    if (user && typeof newDate === 'number') {
      setUser({ ...user, birthday: new Date(newDate) });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (user) {
      setUser({ ...user, [name]: value });
    }
  };

  return (
    <>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              label="Birthday"
              inputVariant="outlined"
              value={user?.birthday}
              onChange={handleDate}
              size="small"
              required
            />
          </MuiPickersUtilsProvider>
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
        <Button color="primary" variant="contained" onClick={handleClick} disabled={!isFilled}>
          Sign Up
        </Button>
      </form>
      {isReg && <Redirect to="/" />}
    </>
  );
};

export default SignUp;