import React, { useEffect, useState } from 'react';

import {
  Button, CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Notification from '../../../components/Notification/Notification';
import { MessageType, ServerResponse } from '../../../models/message.models';
import { Order, OrderStatus } from '../../../models/order.models';
import { Route } from '../../../models/route.models';
import { Track } from '../../../models/track.models';
import { getOrdersData, removeOrderById } from '../../../services/orders.service';
import tableStyles from '../../styles/table.module.scss';
import RoutesAlert from './Alerts/RoutesAlert';
import TracksAlert from './Alerts/TracksAlert';

type OrdersState = {
  orders: Order[]; 
  isLoaded: boolean;
};

type AlertState = {
  routes: Route[] | null,
  tracks: Track[] | null
};

type OrdersProps = {
  page: number;
  checkPages: (length: number) => any
};

const Orders = ({ page, checkPages }: OrdersProps) => {
  const ITEMS_ON_PAGE = 20;
  
  const [notifyMessage, setNotifyMessage] = useState<ServerResponse<any> | null>(null);
  const [isAlertOpen, setAlertOpen] = useState<AlertState>({
    routes: null,
    tracks: null
  });
  const [isChanged, setChanged] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [state, setState] = useState<OrdersState>({
    orders: [],
    isLoaded: false
  });

  useEffect(() => {
    (async () => {
      const ordersResponse = await getOrdersData();
      if (ordersResponse.messageType === MessageType.Error) {
        setNotifyMessage(ordersResponse);
      } else if (ordersResponse.data instanceof Array) {
        setState({ ...state, orders: ordersResponse.data, isLoaded: true });
        setPagesNumber(Math.round(ordersResponse.data.length / ITEMS_ON_PAGE));
      }
    })();
  }, [isChanged]);

  useEffect(() => {
    checkPages(pagesNumber);
  }, [pagesNumber]);

  const removeOrder = async (order: Order) => {
    if (order._id) {
      const response = await removeOrderById(order._id);
      setNotifyMessage(response);
      setChanged(!isChanged);
    }
  };

  return (
    <>
      {notifyMessage && <Notification {...notifyMessage} afterClose={() => setNotifyMessage(null)} />}
      {!state.isLoaded ? (
        <CircularProgress />
      ) : (
        <Fade in={state.isLoaded} timeout={200} unmountOnExit>
          <TableContainer component={Paper} className={tableStyles.table}>
            {isAlertOpen.routes && <RoutesAlert routes={isAlertOpen.routes} handleModal={() => setAlertOpen({...isAlertOpen, routes: null})} />}
            {isAlertOpen.tracks && <TracksAlert tracks={isAlertOpen.tracks} handleModal={() => setAlertOpen({...isAlertOpen, tracks: null})} />}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="right" className={tableStyles.nowrap}>Track Number</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Routes</TableCell>
                  <TableCell align="center">Tracks</TableCell>
                  <TableCell align="right">Message</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.orders.slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE).map((order, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {order.status}
                    </TableCell>
                    <TableCell align="right" className={tableStyles.nowrap}>
                      <span className={tableStyles.code}>{order.trackNumber}</span>
                    </TableCell>
                    <TableCell align="right">
                      {order.username}
                    </TableCell>
                    <TableCell align="right">
                      {order.price}
                    </TableCell>
                    <TableCell align="center">
                      <Button color="primary" onClick={() => setAlertOpen({...isAlertOpen, routes: order.routes})}>Routes</Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button color="primary" onClick={() => setAlertOpen({...isAlertOpen, tracks: order.tracks})}>Tracks</Button>
                    </TableCell>
                    <TableCell align="right">
                      {order.message}
                    </TableCell>
                    <TableCell align="right" padding='none'> 
                      <IconButton size='small' onClick={() => removeOrder(order)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className={tableStyles.total}>
              <span>{`${state.orders.length} orders(s)`}</span>
              <span>{`${state.orders.filter(order => order.status === OrderStatus.Canceled).length} canceled order(s)`}</span>
              <span>{`${state.orders.filter(order => order.status === OrderStatus.Taken).length} taken order(s)`}</span>
              <span>{`${state.orders.filter(order => order.status === OrderStatus.Completed).length} completed order(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
};

export default Orders;