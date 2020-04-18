import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { User } from '../../../models/user.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import styles from './form.module.scss';

const UsersDialog = observer(() => {
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    birthday: new Date(),
    email: '',
    phone: '',
    username: 'username',
    password: 'password',
    isAdmin: false
  });

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  const handleClose = () => {
    adminStore.dialog.close();
  };

  const handleSubmit = async () => {
    const response = await adminStore.users.add(user);
    appStore.setNotify(response);
    handleClose();
  };

  const handleDate = (date: MaterialUiPickersDate) => {
    const newDate = date?.getTime();
    if (typeof newDate === 'number') {
      setUser({...user, birthday: new Date(newDate) });
    }
  };

  return (
    <>
      <Dialog open={adminStore.dialog.isOpen} onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Users</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <TextField
              label="Name"
              onChange={e => setUser({...user, name: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Surname"
              onChange={e => setUser({...user, surname: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker  
                label="Birthday" 
                inputVariant="outlined" 
                value={user.birthday} 
                onChange={handleDate}
              />
            </MuiPickersUtilsProvider>
            <TextField
              label="E-Mail"
              onChange={e => setUser({...user, email: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Phone"
              onChange={e => setUser({...user, phone: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Username"
              onChange={e => setUser({...user, username: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Password"
              onChange={e => setUser({...user, password: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <FormControl variant="outlined">
              <InputLabel id="admin_input_label">Status</InputLabel>
              <Select 
                labelId="admin_input_label"
                labelWidth={55} 
                value={user.isAdmin ? 'Admin' : 'User'}
                onChange={e => setUser({...user, isAdmin: e.target.value === 'Admin'})}
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
});

export default UsersDialog;