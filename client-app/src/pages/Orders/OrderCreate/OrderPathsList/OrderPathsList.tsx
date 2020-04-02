import React, { useEffect, useState } from 'react';

import { Card, LinearProgress, List } from '@material-ui/core';

import { OrderUser } from '../../../../models/order.models';
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
      const pathsData = (await getOrderPaths(order)).data;
      setState({
        paths: pathsData,
        isLoaded: true
      });
    })();
  }, [])

  return (
    <>
      {!state.isLoaded ? (
        <LinearProgress />
      ) : (
        <>
          {state.paths.map((path, index) => (
            <Card key={index}>
              <List component="nav" disablePadding>
                <OrderPath userPath={path} callback={callback} />
              </List>
            </Card>
          ))}
        </>
      )}
    </>
  );
}

export default OrderPathsList;
