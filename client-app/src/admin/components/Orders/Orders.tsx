import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';

import {
    Button, CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Order, OrderStatus } from '../../../models/orders.models';
import { Route } from '../../../models/routes.models';
import { Track } from '../../../models/tracks.models';
import { getOrdersData, removeOrderById } from '../../../services/orders.service';
import tableStyles from '../../styles/table.module.scss';
import { RoutesModal } from './Modals/RoutesModal';
import { TracksModal } from './Modals/TracksModal';

type OrdersState = {
  orders: Order[]; 
  isLoaded: boolean;
}

type ModalsState = {
  routes: Route[] | null,
  tracks: Track[] | null
}

type OrdersProps = {
  page: number;
  checkPages: (length: number) => any
}

export const Orders = (props: OrdersProps) => {
  const ITEMS_ON_PAGE = 20;
  
  const [modals, setModal] = useState<ModalsState>({
    routes: null,
    tracks: null
  });
  const [changes, setChanges] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [state, setState] = useState<OrdersState>({
    orders: [],
    isLoaded: false
  })

  useEffect(() => {
    (async () => {
      const orders = await getOrdersData();
      setState({ ...state, orders, isLoaded: true });
      setPagesNumber(Math.round(orders.length / ITEMS_ON_PAGE));
    })()
  }, [changes])

  useEffect(() => {
    props.checkPages(pagesNumber);
  }, [pagesNumber])

  const removeOrder = async (order: Order) => {
    if (order._id) {
      const res = await removeOrderById(order._id);
      setChanges(!changes);
      cogoToast.warn(res, {position: 'bottom-right'});
    }
  }

  return (
    !state.isLoaded ? (
      <CircularProgress />
    ) : (
      <Fade in={state.isLoaded} timeout={200} unmountOnExit>
        <TableContainer component={Paper} className={tableStyles.table}>
          {modals.routes && <RoutesModal routes={modals.routes} handleModal={() => setModal({...modals, routes: null})} />}
          {modals.tracks && <TracksModal tracks={modals.tracks} handleModal={() => setModal({...modals, tracks: null})} />}
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
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.orders.slice((props.page - 1) * ITEMS_ON_PAGE, props.page * ITEMS_ON_PAGE).map((order, index) => (
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
                    <Button color="primary" onClick={() => setModal({...modals, routes: order.routes})}>Routes</Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button color="primary" onClick={() => setModal({...modals, tracks: order.tracks})}>Tracks</Button>
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
    )
  );
}
