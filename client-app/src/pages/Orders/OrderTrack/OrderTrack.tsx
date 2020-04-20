import { Button, Card, LinearProgress, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { isOfType } from '../../../helpers/typeGuard';
import { MessageType } from '../../../models/message.models';
import { Order } from '../../../models/order.models';

import { getOrderByTrackNumber } from '../../../services/orders.service';
import { AppContext } from '../../../stores/AppStore';
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

  const appStore = useContext(AppContext);

  const showOrder = async () => {
    if (trackNumber !== '') {
      setState({ ...state, isLoading: true });
      const orderResponse = await getOrderByTrackNumber(trackNumber);
      if (orderResponse.messageType === MessageType.Error) {
        appStore.setNotify(orderResponse);
      } else if (isOfType<Order>(orderResponse.data, 'trackNumber')) {
        setState({ ...state, order: orderResponse.data, isLoading: false });
      }
    }
  };

  return (
    <>
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
