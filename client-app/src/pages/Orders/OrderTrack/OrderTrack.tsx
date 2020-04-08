import React, { useState } from 'react';

import { Button, Card, LinearProgress, TextField } from '@material-ui/core';

import { getOrderByTrackNumber } from '../../../services/orders.service';
import styles from './orderTrack.module.scss';
import OrderTrackInfo from './OrderTrackInfo/OrderTrackInfo';
import { MessageType, ServerResponse } from '../../../models/message.models';
import Notification from '../../../components/Notification/Notification';
import { Order } from '../../../models/order.models';

type OrderTrackState = {
  order: Order | null,
  isLoaded: boolean;
};

const OrderTrack = () => {
  const [state, setState] = useState<OrderTrackState>({
    order: null,
    isLoaded: true
  });
  const [trackNumber, setTrackNumber] = useState('');
  const [dialogResult, setDialogResult] = useState<ServerResponse<any> | null>(null);

  const showOrder = async () => {
    setState({ ...state, isLoaded: false });
    const orderResponse = await getOrderByTrackNumber(trackNumber);
    if (orderResponse.messageType === MessageType.Error) {
      setDialogResult(orderResponse);
    } else {
      setState({ ...state, order: orderResponse.data });
    }
    setState({ ...state, isLoaded: true });
  };

  return (
    <>
      {dialogResult && <Notification {...dialogResult} afterClose={() => setDialogResult(null)} />}
      <Card className={styles.track}>
        <TextField
          name="trackNumber"
          value={trackNumber}
          label="Track number"
          onChange={(e) => setTrackNumber(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={showOrder}
          fullWidth
        >
          Find order
        </Button>
      </Card>
      {!state.isLoaded ? (
        <LinearProgress />
      ) : (
        <>
          {state.order && <OrderTrackInfo order={state.order} />}
        </>
      )}
    </>
  );
};

export default OrderTrack;
