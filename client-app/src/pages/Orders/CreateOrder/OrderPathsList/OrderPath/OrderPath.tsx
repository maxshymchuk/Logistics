import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { ListItem, ListItemText, Collapse, List, Button, Chip, Avatar } from '@material-ui/core';
import styles from './OrderPath.module.scss';
import { UserPath } from '../../../../../models/locations.models';

type OrderPathState = {
  isLoaded: boolean;
  isPathOpen: boolean;
};

type OrderPathProps = {
  userPath: UserPath;
  callback: any;
};

class OrderPath extends Component<OrderPathProps, OrderPathState> {
  state: OrderPathState = {
    isLoaded: false,
    isPathOpen: false
  };

  handleClick = () => {
    this.setState(state => ({
      isPathOpen: !state.isPathOpen
    }));
  };

  handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.callback(this.props.userPath);
  };

  getHoursStr = (hours: number) => {
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  };

  render() {
    return (
      <>
        <ListItem button onClick={this.handleClick}>
          {this.state.isPathOpen ? <ExpandLess /> : <ExpandMore />}
          <ListItemText
            className={styles.routes}
            primary={this.props.userPath.paths.map(path => path.vehicle).join(' – ')}
          />
          <ListItemText style={{ flexGrow: 0 }} className={styles.time}>
            <Chip
              style={{ cursor: 'pointer' }}
              icon={<ScheduleIcon />}
              label={this.getHoursStr(this.props.userPath.timeInterval)}
            />
          </ListItemText>
          <ListItemText style={{ flexGrow: 0 }} className={styles.price}>
            <Chip
              style={{ cursor: 'pointer' }}
              avatar={<Avatar>$</Avatar>}
              color='primary'
              label={this.props.userPath.price.toFixed(2)}
            />
          </ListItemText>
          <Button variant='contained' color='primary' onClick={this.handleOrder}>
            Take
          </Button>
        </ListItem>
        <Collapse in={this.state.isPathOpen} unmountOnExit>
          <List disablePadding>
            {this.props.userPath.paths.map((routes, index) => (
              <div key={index}>
                <Divider />
                <ListItem>
                  <ListItemText>
                    <span>{routes.vehicle}</span>
                    <span className={styles.vehicleTime}>{this.getHoursStr(routes.timeInterval)}</span>
                  </ListItemText>
                  <List className={styles.list} disablePadding>
                    {routes.routes.map((route, index) => (
                      <ListItemText key={index}>{route}</ListItemText>
                    ))}
                  </List>
                </ListItem>
              </div>
            ))}
          </List>
        </Collapse>
      </>
    );
  }
}

export default OrderPath;
