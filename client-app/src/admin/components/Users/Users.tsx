import cogoToast from 'cogo-toast';
import React, { useContext, useEffect, useState } from 'react';

import {
  CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { User } from '../../../models/users.models';
import { AdminContext } from '../../../pages/Admin/Admin';
import { getUsersData, removeUserById } from '../../../services/users.service';
import tableStyles from '../../styles/table.module.scss';
import styles from './users.module.scss';

type UsersState = {
  users: User[]; 
  isLoaded: boolean;
};

type UsersProps = {
  page: number;
  checkPages: (length: number) => any
};

const Users = ({ page, checkPages }: UsersProps) => {
  const ITEMS_ON_PAGE = 20;

  const [changes, setChanges] = useState(false);
  const [length, setLength] = useState(0);
  const [state, setState] = useState<UsersState>({
    users: [],
    isLoaded: false
  });

  const context = useContext<boolean>(AdminContext);

  useEffect(() => {
    (async () => {
      const users = await getUsersData();
      setState({ ...state, users, isLoaded: true });
      setLength(Math.round(users.length / ITEMS_ON_PAGE));
    })();
  }, [changes, context]);

  useEffect(() => {
    checkPages(length);
  }, [length]);

  const removeUser = async (user: User) => {
    if (user._id) {
      const res = await removeUserById(user._id);
      setChanges(!changes);
      cogoToast.warn(res, {position: 'bottom-right'});
    }
  };

  return (
    !state.isLoaded ? (
      <CircularProgress />
    ) : (
      <Fade in={state.isLoaded} timeout={200} unmountOnExit>
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
              {state.users.slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE).map((user, index) => (
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
            <span>{`${state.users.filter(user => user.isAdmin).length} admin(s)`}</span>
            <span>{`${state.users.filter(user => !user.isAdmin).length} user(s)`}</span>
          </section>
        </TableContainer>
      </Fade>
    )
  );
};

export default Users;