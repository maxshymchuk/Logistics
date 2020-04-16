import { Button, Card, Collapse, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { useContext, useState } from 'react';
import { Cargo } from '../../../../models/cargo.models';
import { Order, OrderStatus } from '../../../../models/order.models';
import { Route } from '../../../../models/route.models';
import { Track } from '../../../../models/track.models';
import { updateOrderById } from '../../../../services/orders.service';
import { AppContext } from '../../../../stores/AppStore';
import OrderCargoItem from '../../OrderCreate/OrderCargo/OrderCargoItem/OrderCargoItem';
import styles from './orderTrackInfo.module.scss';

type OrderTrackInfoProps = {
  order: Order;
};

const OrderTrackInfo = ({ order: orderProps }: OrderTrackInfoProps) => {
  const [order, setOrder] = useState(orderProps);

  const [isRoutesOpen, setRoutesOpen] = useState(false);
  const [isTracksOpen, setTracksOpen] = useState(false);
  const [isCargoOpen, setCargoOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  const appStore = useContext(AppContext);

  const isCargoExist = () => {
    return !!order.routes[0].cargo.length;
  };

  const getCargoItem = (cargo: Cargo, index: number) => {
    return <OrderCargoItem key={index} cargo={cargo} id={index} />;
  };

  const getRouteItem = (route: Route) => {
    const routePath = `${route.startLocation.name} – ${route.endLocation.name}`;
    const date = new Date(route.departureDate).toLocaleString();
    return (
      <div key={route._id} className={styles.details}>
        <span>{routePath}</span>
        <span className={styles.date}>{date}</span>
      </div>
    );
  };

  const getTrackItem = (track: Track) => {
    const depDate = new Date(track.departureDate).toLocaleString();
    const arrDate = new Date(track.arrivalDate).toLocaleString();
    const {status} = track;
    return (
      <div key={track._id} className={styles.details}>
        <div>
          <span>{depDate}</span>
          <br />
          <span>{arrDate}</span>
        </div>
        <span>{status}</span>
      </div>
    );
  };

  const cancelOrder = async () => {
    const canceledOrder = {...order, status: OrderStatus.Canceled};
    const response = await updateOrderById(canceledOrder);
    appStore.setNotify(response);
    setOrderOpen(false);
    setOrder({ ...order, status: OrderStatus.Canceled });
  };

  return (
    <>
      <Card className={styles.order}>
        <List component="nav" disablePadding>
          <ListItem button onClick={() => setOrderOpen(!isOrderOpen)}>
            <section className={styles.list_title}>
              <Typography className={styles.title} variant="h6">
                {order.status}
              </Typography>
              <span className={styles.taken_time}>{new Date(order.takenTime).toLocaleString()}</span>
            </section>
            {isOrderOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={isOrderOpen} unmountOnExit>
            <section className={styles.content}>
              <div className={styles.row}>
                Track Number: &nbsp;
                <span className={styles.track_number}>{order.trackNumber}</span>
              </div>
              <div className={styles.row}>
                Price: &nbsp;
                <span className={styles.price}>{order.price}</span>
              </div>
              {isCargoExist() && (
                <Card className={styles.row}>
                  <List component="nav" disablePadding>
                    <ListItem button onClick={() => setCargoOpen(!isCargoOpen)}>
                      <ListItemText primary="Cargo" />
                      {isCargoOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={isCargoOpen} unmountOnExit>
                      <List disablePadding>
                        {order.routes[0].cargo.map((cargo, index) => getCargoItem(cargo, index))}
                      </List>
                    </Collapse>
                  </List>
                </Card>
              )}
              <Card className={styles.row}>
                <List component="nav" disablePadding>
                  <ListItem button onClick={() => setRoutesOpen(!isRoutesOpen)}>
                    <ListItemText primary="Routes" />
                    {isRoutesOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={isRoutesOpen} unmountOnExit>
                    <List disablePadding>
                      {order.routes.map(route => getRouteItem(route))}
                    </List>
                  </Collapse>
                </List>
              </Card>
              <Card className={styles.row}>
                <List component="nav" disablePadding>
                  <ListItem button onClick={() => setTracksOpen(!isTracksOpen)}>
                    <ListItemText primary="Tracks" />
                    {isTracksOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={isTracksOpen} unmountOnExit>
                    <List disablePadding>
                      {order.tracks.map(track => getTrackItem(track))}
                    </List>
                  </Collapse>
                </List>
              </Card>
              {order.message && <div className={styles.message}>{order.message}</div>}
              {order.status === OrderStatus.Taken && (
                <Button className={styles.cancel} onClick={cancelOrder} color="secondary" fullWidth>
                  Cancel order
                </Button>
              )}
            </section>
          </Collapse>
        </List>
      </Card>
    </>
  );
};

export default OrderTrackInfo;
