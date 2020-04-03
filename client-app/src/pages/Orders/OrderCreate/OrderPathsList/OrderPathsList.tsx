import React, { useEffect, useState } from 'react';

import { LinearProgress, List, Paper } from '@material-ui/core';

import { OrderPaths, OrderUser } from '../../../../models/order.models';
import { UserPath } from '../../../../models/path.models';
import { getOrderPaths } from '../../../../services/orders.service';
import OrderPath from './OrderPath/OrderPath';
import styles from './OrderPathsList.module.scss';

type OrderPathsListState = {
  paths: UserPath[];
  isLoaded: boolean;
};

type CreateOrderPathsProps = {
  order: OrderUser;
  callback: any;
};

const OrderPathsList = ({ order, callback }: CreateOrderPathsProps) => {
  const [state, setState] = useState<OrderPathsListState>({
    paths: [],
    isLoaded: false
  });

  useEffect(() => {
    (async () => {
      if (order.locations) {
        const orderUser: OrderPaths = {
          from: order.locations?.from.name,
          to: order.locations?.to.name,
          cargo: order.cargo,
          message: order.message
        };
        const pathsData = (await getOrderPaths(orderUser)).data;
        setState({
          paths: pathsData,
          isLoaded: true
        });
      }
    })();
  }, []);

  return (
    <>
      {!state.isLoaded ? (
        <LinearProgress />
      ) : (
        <>
          {state.paths.map((path, index) => (
            <Paper className={styles.path_item} key={index}>
              <List component="nav" disablePadding>
                <OrderPath userPath={path} callback={callback} />
              </List>
            </Paper>
          ))}
        </>
      )}
    </>
  );
};

export default OrderPathsList;
