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
  }, [isSelectChanged])

  useEffect(() => {
    onSelect(isSelectedPath ? userPath : null);
  }, [isSelectedPath])

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
      <ListItem button onClick={handleClick}>
        {state.isPathOpen ? <ExpandLess /> : <ExpandMore />}
        <ListItemText
          className={styles.routes}
          primary={userPath.paths
            .map(path => path.vehicle)
            .join(' – ')}
        />
        <ListItemText style={{ flexGrow: 0 }} className={styles.time}>
          <Chip
            style={{ cursor: 'pointer' }}
            icon={<ScheduleIcon />}
            label={getHoursStr(userPath.timeInterval)}
          />
        </ListItemText>
        <ListItemText style={{ flexGrow: 0 }} className={styles.price}>
          <Chip
            style={{ cursor: 'pointer' }}
            avatar={<Avatar>$</Avatar>}
            color="primary"
            label={userPath.price}
          />
        </ListItemText>
        <Button
          variant={isSelectedPath ? "contained" : "outlined"}
          color="primary"
          onClick={handleOrder}
        >
          Take
        </Button>
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
