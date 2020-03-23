import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  Button, CircularProgress, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Skeleton from '@material-ui/lab/Skeleton';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Message } from '../../../models/messages.models';
import { User } from '../../../models/users.models';
import { getLoggedUser, updateUser } from '../../../services/users.service';
import styles from './settingsModal.module.scss';

export type SettingsModalProps = {
  result: (message: Message) => void;
  onClose: () => void;
};

export const SettingsModal = ({ result, onClose }: SettingsModalProps) => {
  const [isUpdating, setUpdating] = useState(false);
  const [isPasswordOpen, setPasswordOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const loggedUser = await getLoggedUser();
      setUser(loggedUser);
    })();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleUpdate = async () => {
    setUpdating(true);
    if (user) {
      updateUser(user).then((message) => {
        setUpdating(false);
        result(message);
        handleClose();
      });
    }
  };

  const handleClickShowPassword = () => {
    setPasswordOpen(!isPasswordOpen);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Dialog open onClose={handleClose} scroll="body" maxWidth="xs" fullWidth>
        <DialogTitle>User Settings</DialogTitle>
        <DialogContent>
          <form className={styles.form}>
            <>
              {user ? (
                <TextField
                  label="Name"
                  name="name"
                  defaultValue={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                />
              ) : (
                <Skeleton variant="text" />
              )}
              {user ? (
                <TextField
                  label="Surname"
                  name="surname"
                  defaultValue={user.surname}
                  onChange={e => setUser({ ...user, surname: e.target.value })}
                />
              ) : (
                <Skeleton variant="text" />
              )}
              {user ? (
                <TextField
                  label="E-Mail"
                  name="email"
                  defaultValue={user.email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                />
              ) : (
                <Skeleton variant="text" />
              )}
              {user ? (
                <TextField
                  label="Phone"
                  name="phone"
                  defaultValue={user.phone}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                  type='number'
                />
              ) : (
                <Skeleton variant="text" />
              )}
              {user ? (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker 
                    label="Birthday" 
                    value={user.birthday} 
                    onChange={date => setUser({ ...user, birthday: date as Date })}
                  />
                </MuiPickersUtilsProvider>
              ) : (
                <Skeleton variant="text" />
              )}
              {user ? (
                <FormControl>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    name="password"
                    defaultValue={user.password}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                    type={isPasswordOpen ? 'password' : 'text'}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {isPasswordOpen ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )}
                  />
                </FormControl>
              ) : (
                <Skeleton variant="text" />
              )}
            </>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={user ? handleUpdate : undefined} color="primary" variant="contained" disabled={!user}>
            {isUpdating && <CircularProgress className={styles.progress} color='inherit' size={20} />}
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
