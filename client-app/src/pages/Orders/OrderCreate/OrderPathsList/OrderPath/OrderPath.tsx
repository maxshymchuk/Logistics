import React, { useContext, useEffect, useState } from 'react';

import { Avatar, Button, Chip, Collapse, List, ListItem, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { PathsContext } from '../../../../../contexts/PathsContext';
import { UserPath } from '../../../../../models/path.models';
import styles from './OrderPath.module.scss';

type OrderPathState = {
  isLoaded: boolean;
  isPathOpen: boolean;
};

type OrderPathProps = {
  isSelected: boolean;
  userPath: UserPath;
  onSelect: (path: UserPath | null) => void;
};

const OrderPath = ({ userPath, isSelected, onSelect }: OrderPathProps) => {
  const [isSelectedPath, setSelectedPath] = useState(false);
  const [state, setState] = useState<OrderPathState>({
    isLoaded: false,
    isPathOpen: false
  });

  const { isSelectChanged } = useContext(PathsContext);

  useEffect(() => {
    setSelectedPath(isSelected);
  }, [isSelectChanged]);

  useEffect(() => {
    onSelect(isSelectedPath ? userPath : null);
  }, [isSelectedPath]);

  const handleClick = () => {
    setState({
      ...state,
      isPathOpen: !state.isPathOpen
    });
  };

  const handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedPath(true);
  };

  const getHoursStr = (hours: number) => {
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  };

  return (
    <>
      <ListItem className={styles.list_title} button onClick={handleClick}>
        {state.isPathOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          className={styles.routes}
          primary={userPath.paths
            .map(path => path.vehicle)
            .join(' – ')}
        />
        <div className={styles.group}>
          <div className={styles.group}>
            <ListItemText className={styles.time}>
              <Chip
                style={{ cursor: 'pointer' }}
                icon={<ScheduleIcon className={styles.icon} />}
                label={getHoursStr(userPath.timeInterval)}
              />
            </ListItemText>
            <ListItemText className={styles.price}>
              <Chip
                style={{ cursor: 'pointer' }}
                avatar={<Avatar className={styles.icon}>$</Avatar>}
                color="primary"
                label={userPath.price}
              />
            </ListItemText>
          </div>
          <Button
            className={styles.button}
            variant={isSelectedPath ? 'contained' : 'outlined'}
            color="primary"
            onClick={handleOrder}
          >
            Take
          </Button>
        </div>
      </ListItem>
      <Collapse in={state.isPathOpen} unmountOnExit>
        <List disablePadding>
          {userPath.paths.map((routes, index) => (
            <div key={index}>
              <Divider />
              <ListItem>
                <ListItemText>
                  <span>{routes.vehicle}</span>
                  <span className={styles.vehicleTime}>
                    {getHoursStr(routes.timeInterval)}
                  </span>
                </ListItemText>
                <List className={styles.list} disablePadding>
                  {routes.routes.map((route, labelIndex) => (
                    <ListItemText key={labelIndex}>{route}</ListItemText>
                  ))}
                </List>
              </ListItem>
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default OrderPath;
