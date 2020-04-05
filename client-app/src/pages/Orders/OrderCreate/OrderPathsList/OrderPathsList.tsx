import React, { useContext, useEffect, useState } from 'react';

import { LinearProgress, List, Paper } from '@material-ui/core';

import { PathsContext } from '../../../../contexts/PathsContext';
import { MessageType } from '../../../../models/message.models';
import { OrderPaths, OrderUser } from '../../../../models/order.models';
import { UserPath } from '../../../../models/path.models';
import { Route } from '../../../../models/route.models';
import { getOrderPaths } from '../../../../services/orders.service';
import OrderPath from './OrderPath/OrderPath';
import styles from './OrderPathsList.module.scss';

type OrderPathsListState = {
  paths: UserPath[];
  isLoaded: boolean;
};

type CreateOrderPathsProps = {
  order: OrderUser;
  resultPath: (path: UserPath | null) => void;
};

const OrderPathsList = ({ order, resultPath }: CreateOrderPathsProps) => {
  const [selectedPath, setSelectedPath] = useState<UserPath | null>(null);
  const [isChanged, setChanged] = useState(false);
  const [state, setState] = useState<OrderPathsListState>({
    paths: [],
    isLoaded: false
  });

  useEffect(() => {
    resultPath(null);
    (async () => {
      if (order.locations) {
        const orderUser: OrderPaths = {
          from: order.locations?.from.name,
          to: order.locations?.to.name,
          cargo: order.cargo,
          message: order.message
        };
        const pathsResponse = await getOrderPaths(orderUser);
        if (pathsResponse.messageType === MessageType.Error) {

        } else if (pathsResponse.data instanceof Array) {
          setState({
            paths: pathsResponse.data,
            isLoaded: true
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedPath) {
      setChanged(!isChanged);
      resultPath(selectedPath);
    }
  }, [selectedPath])

  return (
    <PathsContext.Provider value={{ isSelectChanged: isChanged }}>
      {!state.isLoaded ? (
        <LinearProgress />
      ) : (
        <section className={styles.paths_list}>
          {state.paths.map((path, index) => (
            <Paper className={styles.path_item} key={index}>
              <List component="nav" disablePadding>
                <OrderPath userPath={path} isSelected={selectedPath == path} onSelect={(path) => setSelectedPath(path)} />
              </List>
            </Paper>
          ))}
        </section>
      )}
    </PathsContext.Provider>
  );
};

export default OrderPathsList;
