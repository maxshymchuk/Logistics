import {
  CircularProgress,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { MessageType } from '../../../models/message.models';
import { User } from '../../../models/user.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import tableStyles from '../../styles/table.module.scss';
import styles from './users.module.scss';

const Users = observer(() => {

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const response = await adminStore.users.init();
      if (response.messageType === MessageType.Error) {
        appStore.setNotify(response);
      }
    })();
  }, []);

  const removeUser = async (user: User) => {
    if (user._id) {
      const response = await adminStore.users.remove(user._id);
      appStore.setNotify(response);
    }
  };

  return (
    <>
      {!adminStore.users.isLoaded ? (
        <CircularProgress />
      ) : (
        <Fade in timeout={200} unmountOnExit>
          <TableContainer component={Paper} className={tableStyles.table}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Birthday</TableCell>
                  <TableCell align="right">E-Mail</TableCell>
                  <TableCell align="right">Phone</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Password</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {adminStore.users.page.map((user, index) => (
                  <TableRow className={user.isAdmin ? styles.admin : undefined} key={index}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell align="right">
                      {user.surname}
                    </TableCell>
                    <TableCell align="right">
                      {new Date(user.birthday).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="right">
                      {user.email}
                    </TableCell>
                    <TableCell align="right">
                      {user.phone}
                    </TableCell>
                    <TableCell align="right">
                      {user.username}
                    </TableCell>
                    <TableCell align="right">
                      {user.password}
                    </TableCell>
                    <TableCell align="right" padding='none'> 
                      <IconButton size='small' onClick={() => removeUser(user)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className={tableStyles.total}>
              <span>{`${adminStore.users.list.filter(user => user.isAdmin).length} admin(s)`}</span>
              <span>{`${adminStore.users.list.filter(user => !user.isAdmin).length} user(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
});

export default Users;