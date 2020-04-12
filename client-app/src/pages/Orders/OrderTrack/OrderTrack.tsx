import { Button, Card, LinearProgress, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import Notification from '../../../components/Notification/Notification';
import { isOfType } from '../../../helpers/typeGuard';
import { MessageType, ServerResponse } from '../../../models/message.models';
import { Order } from '../../../models/order.models';

import { getOrderByTrackNumber } from '../../../services/orders.service';
import styles from './orderTrack.module.scss';
import OrderTrackInfo from './OrderTrackInfo/OrderTrackInfo';

type OrderTrackState = {
  order: Order | null,
  isLoading: boolean;
};

const OrderTrack = () => {
  const [state, setState] = useState<OrderTrackState>({
    order: null,
    isLoading: false
  });
  const [trackNumber, setTrackNumber] = useState('');
  const [dialogResult, setDialogResult] = useState<ServerResponse<any> | null>(null);

  const showOrder = async () => {
    if (trackNumber !== '') {
      setState({ ...state, isLoading: true });
      const orderResponse = await getOrderByTrackNumber(trackNumber);
      if (orderResponse.messageType === MessageType.Error) {
        setDialogResult(orderResponse);
      } else if (isOfType<Order>(orderResponse.data, 'trackNumber')) {
        setState({ ...state, order: orderResponse.data, isLoading: false });
      }
    }
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
      {state.isLoading ? (
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
