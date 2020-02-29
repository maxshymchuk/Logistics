import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';
import styles from './trackOrderInfo.module.scss';
import { Button, Card, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import { Order } from '../../../../models/orders.models';
import { Route } from '../../../../models/routes.models';
import { Track } from '../../../../models/tracks.models';

type TrackOrderInfoProps = {
  order: Order;
};

type TrackOrderInfoState = {
  trackNumber: string;
  isRoutesOpen: boolean;
  isTracksOpen: boolean;
};

enum ListType {
  Tracks,
  Routes
}

class TrackOrderInfo extends Component<TrackOrderInfoProps, TrackOrderInfoState> {
  state = {
    trackNumber: '',
    isRoutesOpen: false,
    isTracksOpen: false
  };

  handleChange = (event: any) => {
    const target = event.target;
    this.setState(state => ({
      trackNumber: target.value
    }));
  };

  handleClick = (listType: ListType) => {
    if (listType === ListType.Routes) {
      this.setState(state => ({
        isRoutesOpen: !state.isRoutesOpen
      }));
    } else {
      this.setState(state => ({
        isTracksOpen: !state.isTracksOpen
      }));
    }
  };

  getRouteItem(route: Route) {
    const routePath = `${route.startLocation.name} -> ${route.endLocation.name}`;
    const date = new Date(route.departureDate).toLocaleString();
    return (
      <ListItem key={route._id} button className={styles.nested}>
        <ListItemText primary={routePath} />
        <ListItemText primary={date} />
      </ListItem>
    );
  }

  getTrackItem(track: Track) {
    const depDate = new Date(track.departureDate).toLocaleString();
    const arrDate = new Date(track.arrivalDate).toLocaleString();
    const status = track.status;
    return (
      <ListItem button key={track._id} className={styles.nested}>
        <ListItemText primary={`${depDate} - ${arrDate}`} />
        <ListItemText primary={status} />
      </ListItem>
    );
  }

  render() {
    const { message, tracks, price, status, routes, trackNumber } = this.props.order;
    return (
      <Card className={styles.order}>
        <span className={styles.title}>
          {status}
          <span className={styles['track-number']}>{trackNumber}</span>
        </span>
        <div className={styles.row}>Price: {price}</div>
        <List component='nav' className={styles.row} disablePadding>
          <ListItem button onClick={() => this.handleClick(ListType.Routes)}>
            <ListItemText primary='Routes' />
            {this.state.isRoutesOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.isRoutesOpen} unmountOnExit>
            <List disablePadding>{routes.map(route => this.getRouteItem(route))}</List>
          </Collapse>
        </List>
        <List component='nav' className={styles.row} disablePadding>
          <ListItem button onClick={() => this.handleClick(ListType.Tracks)}>
            <ListItemText primary='Tracks' />
            {this.state.isTracksOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.isTracksOpen} unmountOnExit>
            <List disablePadding>{tracks.map(track => this.getTrackItem(track))}</List>
          </Collapse>
        </List>
        {message && <div className={styles.row}>{`${message}`}</div>}
        <Button className={styles['button-cancel']} variant='contained' color='secondary' fullWidth>
          Cancel order
        </Button>
      </Card>
    );
  }
}

export default TrackOrderInfo;
