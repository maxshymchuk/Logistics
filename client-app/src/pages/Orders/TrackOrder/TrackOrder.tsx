import cogoToast from "cogo-toast";
import React, { Component } from "react";

import { Button, Card, LinearProgress, TextField } from "@material-ui/core";

import { Order } from "../../../models/orders.models";
import { getOrderByTrackNumber } from "../../../services/orders.service";
import styles from "./trackOrder.module.scss";
import TrackOrderInfo from "./TrackOrderInfo/TrackOrderInfo";

type TrackOrderState = {
  trackNumber: string;
  order: Order;
  isClicked: boolean;
  isTrackFound: boolean;
};

class TrackOrder extends Component<{}, TrackOrderState> {
  state = {
    trackNumber: "",
    order: {} as Order,
    isClicked: false,
    isTrackFound: false
  };

  handleChange = (event: any) => {
    const target = event.target;
    this.setState(state => ({
      trackNumber: target.value
    }));
  };

  showOrder = async () => {
    this.setState(state => ({
      isClicked: true
    }));
    try {
      const res = await getOrderByTrackNumber(this.state.trackNumber);
      this.setState(state => ({
        isTrackFound: true,
        isClicked: false,
        order: res
        // trackNumber: ''
      }));
    } catch (err) {
      this.setState(state => ({
        isClicked: false,
        isTrackFound: false
      }));
      cogoToast.error(err.message, {
        hideAfter: 2
      });
    }
  };

  render() {
    return (
      <>
        <Card className={styles.track}>
          <TextField
            name="trackNumber"
            value={this.state.trackNumber}
            label="Track number"
            onChange={this.handleChange}
            fullWidth
          />
          <Button
            className={styles["button-find"]}
            variant="contained"
            color="primary"
            onClick={this.showOrder}
            fullWidth
          >
            Find order
          </Button>
          {this.state.isClicked && <LinearProgress />}
        </Card>
        {this.state.isTrackFound && <TrackOrderInfo order={this.state.order} />}
      </>
    );
  }
}

export default TrackOrder;
