import React, { useEffect, useState } from 'react';

import { Card, IconButton, LinearProgress, Paper } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';

import Notification from '../../components/Notification/Notification';
import { Message } from '../../models/message.models';
import { Order } from '../../models/order.models';
import { User } from '../../models/user.models';
import { getOrdersByUsername } from '../../services/orders.service';
import { getLoggedUser } from '../../services/users.service';
import TrackOrderInfo from '../Orders/TrackOrder/TrackOrderInfo/TrackOrderInfo';
import styles from './profile.module.scss';
import { SettingsDialog } from './SettingsDialog/SettingsDialog';

const Profile = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [settingsResult, setSettingsResult] = useState<Message<string> | null>(null);

  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedUserMsg = await getLoggedUser();
      const userOrdersMsg = await getOrdersByUsername();
      setUser(loggedUserMsg.data);
      setOrders(userOrdersMsg.data);
    })();
  }, [isChanged]);

  const showOrders = () => {
    return orders?.length ? (
      orders.map((order, index) => (
        <TrackOrderInfo key={index} order={order} />
      ))
    ) : (
      <p className={styles.empty}>
        Sorry, but you have no orders yet
        <SentimentVeryDissatisfiedIcon className={styles.smile} fontSize='large' />
      </p>
    );
  };

  return (
    <>
      {settingsResult && <Notification {...settingsResult} afterClose={() => setSettingsResult(null)} />}
      {isSettingsOpen && <SettingsDialog result={(result) => {setChanged(!isChanged); setSettingsResult(result);}} onClose={() => setSettingsOpen(false)} />}
      <div className={styles.wrapper_profile}>
        <div className={styles.profile}>
          {user ? (
            <>
              <article className={styles.title}>{`${user.name} ${user.surname}`}</article>
              <article className={styles.subtitle}>
                <IconButton size="small" className={styles.settings_title}>
                  <SettingsIcon />
                </IconButton>
                <span className={styles.subtitle_text}>{user.username}</span>
              </article>
            </>
          ) : (
            <Skeleton variant="text" width="100%" height={100} />
          )}
          {user ? (
            <>
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
            </>
          ) : (
            <Skeleton variant="rect" width="100%" height={140} />
          )}
          <IconButton className={styles.settings} onClick={() => setSettingsOpen(true)}>
            <SettingsIcon />
          </IconButton>
        </div>
        <Paper className={styles.orders}>
          <article className={styles.title}>Orders</article>
          {user ? (
            showOrders()
          ) : (
            <p>
              <LinearProgress />
            </p>
          )}
        </Paper>
      </div>
    </>
  );
};

export default Profile;