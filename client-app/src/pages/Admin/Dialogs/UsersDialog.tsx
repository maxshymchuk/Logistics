import React, { useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { ServerResponse } from '../../../models/message.models';
import { User } from '../../../models/user.models';
import { addUser } from '../../../services/users.service';
import styles from './form.module.scss';

export type UsersModalProps = {
  result: (response: ServerResponse) => void;
  onClose: () => void;
};

export const UsersDialog = ({result, onClose}: UsersModalProps) => {
  const [state, setState] = useState<User>({
    name: '',
    surname: '',
    birthday: new Date(),
    email: '',
    phone: '',
    username: 'username',
    password: 'password',
    isAdmin: false
  });

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    const response = await addUser(state);
    result(response);
    handleClose();
  };

  return (
    <>
      <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <TextField
              label="Name"
              onChange={e => setState({...state, name: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Surname"
              onChange={e => setState({...state, surname: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker  
                label="Birthday" 
                inputVariant="outlined" 
                value={state.birthday} 
                onChange={date => setState({...state, birthday: date as Date})}
              />
            </MuiPickersUtilsProvider>
            <TextField
              label="E-Mail"
              onChange={e => setState({...state, email: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Phone"
              onChange={e => setState({...state, phone: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Username"
              onChange={e => setState({...state, username: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Password"
              onChange={e => setState({...state, password: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <FormControl variant="outlined">
              <InputLabel id="admin_input_label">Status</InputLabel>
              <Select 
                labelId="admin_input_label"
                labelWidth={55} 
                value={state.isAdmin ? 'Admin' : 'User'}
                onChange={e => setState({...state, isAdmin: e.target.value === 'Admin'})}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};