import React, { Component } from 'react';

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

class OrderPathsList extends Component<
CreateOrderPathsProps,
OrderPathsListState
> {
  state: OrderPathsListState = {
    paths: [],
    isLoaded: false
  };

  async componentDidMount() {
    const pathsData = (await getOrderPaths(this.props.order)).data;
    this.setState(state => ({
      paths: pathsData,
      isLoaded: true
    }));
  }

  render() {
    return (
      <>
        {!this.state.isLoaded ? (
          <LinearProgress />
        ) : (
          <>
            {this.state.paths.map((path, index) => (
              <Card key={index}>
                <List component="nav" disablePadding>
                  <OrderPath userPath={path} callback={this.props.callback} />
                </List>
              </Card>
            ))}
          </>
        )}
      </>
    );
  }
}

export default OrderPathsList;
