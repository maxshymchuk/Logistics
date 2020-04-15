import {
  Button,
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
import React, { useContext, useEffect, useState } from 'react';
import { Cargo } from '../../../models/cargo.models';
import { MessageType } from '../../../models/message.models';
import { Order, OrderStatus } from '../../../models/order.models';
import { Route } from '../../../models/route.models';
import { Track } from '../../../models/track.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import tableStyles from '../../styles/table.module.scss';
import CargoAlert from './Alerts/CargoAlert';
import RoutesAlert from './Alerts/RoutesAlert';
import TracksAlert from './Alerts/TracksAlert';

type AlertState = {
  routes: Route[] | null,
  tracks: Track[] | null,
  cargo: Cargo[] | null
};

const Orders = observer(() => {

  const [isAlertOpen, setAlertOpen] = useState<AlertState>({
    routes: null,
    tracks: null,
    cargo: null
  });

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const response = await adminStore.orders.init();
      if (response.messageType === MessageType.Error) {
        appStore.setNotify(response);
      }
    })();
  }, []);

  const removeOrder = async (order: Order) => {
    if (order._id) {
      const response = await adminStore.orders.remove(order._id);
      appStore.setNotify(response);
    }
  };

  const getOrdersByStatus = (status: OrderStatus) => {
    return adminStore.orders.list.filter(order => order.status === status);
  };

  return (
    <>
      {!adminStore.orders.isLoaded ? (
        <CircularProgress />
      ) : (
        <Fade in timeout={200} unmountOnExit>
          <TableContainer component={Paper} className={tableStyles.table}>
            {isAlertOpen.routes && <RoutesAlert routes={isAlertOpen.routes} onClose={() => setAlertOpen({...isAlertOpen, routes: null})} />}
            {isAlertOpen.tracks && <TracksAlert tracks={isAlertOpen.tracks} onClose={() => setAlertOpen({...isAlertOpen, tracks: null})} />}
            {isAlertOpen.cargo && <CargoAlert cargo={isAlertOpen.cargo} onClose={() => setAlertOpen({...isAlertOpen, cargo: null})} />}
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="right" className={tableStyles.nowrap}>Track Number</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Routes</TableCell>
                  <TableCell align="center">Tracks</TableCell>
                  <TableCell align="center">Cargo</TableCell>
                  <TableCell align="right">Message</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {adminStore.orders.page.map((order, index) => (
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
                    <TableCell align="center">
                      <Button color="primary" onClick={() => setAlertOpen({...isAlertOpen, cargo: order.routes[0].cargo})}>Cargo</Button>
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
              <span>{`${adminStore.orders.list.length} orders(s)`}</span>
              <span>{`${getOrdersByStatus(OrderStatus.Canceled).length} canceled order(s)`}</span>
              <span>{`${getOrdersByStatus(OrderStatus.Taken).length} taken order(s)`}</span>
              <span>{`${getOrdersByStatus(OrderStatus.Completed).length} completed order(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
});

export default Orders;