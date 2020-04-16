import { Card, Fab, Fade, IconButton, LinearProgress, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ServerResponse } from '../../models/message.models';

import { Order } from '../../models/order.models';
import { User } from '../../models/user.models';
import { getOrdersByUsername } from '../../services/orders.service';
import { getLoggedUser } from '../../services/users.service';
import { AppContext } from '../../stores/AppStore';
import OrderTrackInfo from '../Orders/OrderTrack/OrderTrackInfo/OrderTrackInfo';
import styles from './profile.module.scss';
import { SettingsDialog } from './SettingsDialog/SettingsDialog';

const Profile = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const [isChanged, setChanged] = useState(false);

  const appStore = useContext(AppContext);

  useEffect(() => {
    (async () => {
      const userOrdersResponse = await getOrdersByUsername();
      setOrders(userOrdersResponse.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const userResponse = await getLoggedUser();
      setUser(userResponse.data);
    })();
  }, [isChanged]);

  const showOrders = () => {
    return orders?.length ? (
      orders.map((order, index) => (
        <OrderTrackInfo key={index} order={order} />
      ))
    ) : (
      <Typography className={styles.empty} variant="h5">
        Sorry, but you have no orders yet
      </Typography>
    );
  };

  const setSettingsResult = (result: ServerResponse<User | null>) => {
    setChanged(!isChanged);
    appStore.setNotify(result);
  };

  return (
    <Fade in timeout={200} unmountOnExit>
      <div className={styles.container}>
        {isSettingsOpen && <SettingsDialog result={(result) => setSettingsResult(result)} onClose={() => setSettingsOpen(false)} />}
        <div className={styles.wrapper_profile}>
          <div className={styles.profile}>
            {user ? (
              <>
                <Typography className={styles.title} variant="h4" component="article">
                  {`${user.name} ${user.surname}`}
                </Typography>
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
          <section className={styles.orders}>
            <Typography className={styles.title} variant="h4" component="article">
              Orders
            </Typography>
            {user ? (
              showOrders()
            ) : (
              <LinearProgress />
            )}
          </section>
        </div>
        <Fab className={styles.create_order} color="primary">
          <IconButton component={Link} to='/create'>
            <AddIcon />
          </IconButton>
        </Fab>
      </div>
    </Fade>
  );
};

export default Profile;