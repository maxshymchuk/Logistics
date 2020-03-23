import React, { useEffect, useState } from 'react';

import { Card, IconButton, LinearProgress, Paper } from '@material-ui/core';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';

import Notification from '../../components/Notification/Notification';
import { Message } from '../../models/messages.models';
import { Order } from '../../models/orders.models';
import { User } from '../../models/users.models';
import { getOrdersByUsername } from '../../services/orders.service';
import { getLoggedUser } from '../../services/users.service';
import TrackOrderInfo from '../Orders/TrackOrder/TrackOrderInfo/TrackOrderInfo';
import { SettingsModal } from './Modal/SettingsModal';
import styles from './profile.module.scss';

const Profile = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [settingsResult, setSettingsResult] = useState<Message | null>(null);

  const [changes, setChanges] = useState(false);

  useEffect(() => {
    (async () => {
      const loggedUser = await getLoggedUser();
      const userOrders = await getOrdersByUsername();
      setUser(loggedUser);
      setOrders(userOrders);
    })();
  }, [changes]);

  return (
    <>
      {settingsResult && <Notification {...settingsResult} afterClose={() => setSettingsResult(null)} />}
      {isSettingsOpen && <SettingsModal result={(result) => {setChanges(!changes); setSettingsResult(result);}} onClose={() => setSettingsOpen(false)} />}
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
          {(() => {
            if (user) {
              return orders ? (
                orders.map((order, index) => (
                  <TrackOrderInfo key={index} order={order} />
                ))
              ) : (
                <p className={styles.empty}>
                  Sorry, but you have no orders yet
                  <SentimentVeryDissatisfiedIcon className={styles.smile} fontSize='large' />
                </p>
              );
            } 
            return (
              <p>
                <LinearProgress />
              </p>
            );
          })()}
        </Paper>
      </div>
    </>
  );
};

export default Profile;