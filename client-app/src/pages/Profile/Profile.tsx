import React, { useEffect, useState } from 'react';

import {
  Card, CardActions, CardContent, CardHeader, IconButton, Paper,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

import { Order } from '../../models/orders.models';
import { User, UserSignUp } from '../../models/users.models';
import { getOrdersByUsername } from '../../services/orders.service';
import { getLoggedUser } from '../../services/users.service';
import TrackOrder from '../Orders/TrackOrder/TrackOrder';
import TrackOrderInfo from '../Orders/TrackOrder/TrackOrderInfo/TrackOrderInfo';
import styles from './profile.module.scss';

export const Profile = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User>({
    name: '',
    surname: '',
    birthday: new Date(),
    email: '',
    phone: '',
    username: '',
    password: '',
    isAdmin: false,
  });

  useEffect(() => {
    (async () => {
      const user = await getLoggedUser();
      setUser(user);
    })();
    (async () => {
      const orders = await getOrdersByUsername();
      setOrders(orders);
    })();
  }, []);

  return (
    <div className={styles.wrapper_profile}>
      <div className={styles.profile}>
        <article className={styles.title}>{`${user.name} ${user.surname}`}</article>
        <article className={styles.subtitle}>
          <IconButton size="small" className={styles.settings_title}>
            <SettingsIcon />
          </IconButton>
          <span className={styles.subtitle_text}>{user.username}</span>
        </article>
        <Card className={styles.property}>
          <span>E-Mail:</span>
          <span>{user.email}</span>
        </Card>
        <Card className={styles.property}>
          <span>Birthday:</span>
          <span>{new Date(user.birthday).toLocaleDateString()}</span>
        </Card>
        <Card className={styles.property}>
          <span>Phone:</span>
          <span>{user.phone}</span>
        </Card>
        <IconButton className={styles.settings}>
          <SettingsIcon />
        </IconButton>
      </div>
      <Paper className={styles.orders}>
        <article className={styles.title}>Orders</article>
        {orders.map((order, index) => (
          <TrackOrderInfo key={index} order={order} />
        ))}
      </Paper>
    </div>
  );
};
