import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import { Box, Card, Tab, Tabs, Typography, Zoom } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import Locations from '../../admin/components/Locations/Locations';
import Menu from '../../admin/components/Menu/Menu';
import Orders from '../../admin/components/Orders/Orders';
import Users from '../../admin/components/Users/Users';
import Vehicles from '../../admin/components/Vehicles/Vehicles';
import Notification from '../../components/Notification/Notification';
import { AdminContext } from '../../contexts/AdminContext';
import { Message } from '../../models/message.models';
import styles from './admin.module.scss';
import { LocationsDialog } from './Dialogs/LocationsDialog';
import { UsersDialog } from './Dialogs/UsersDialog';
import { VehiclesDialog } from './Dialogs/VehiclesDialog';

type TabPanelProps = {
  children?: React.ReactNode;
  index: any;
  value: any;
};

const useStyles = makeStyles(() =>
  createStyles({
    fab: {
      position: 'fixed',
      right: '20px',
      bottom: '20px'
    },
    header: {
      borderRadius: 0,
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: 1
    }
  })
);

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Admin = () => {
  const classes = useStyles();

  const paths = ['/admin/vehicles', '/admin/users', '/admin/locations', '/admin/orders'];

  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState<Message<string> | null>(null);
  const [tab, setTab] = useState(
    paths.indexOf(window.location.pathname)
  );

  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const setResult = (result: Message<string>) => {
    setDialogResult(result);
    setChanged(!isChanged);
  };

  const getModal = () => {
    switch (tab) {
      case 0: return <VehiclesDialog result={(result) => setResult(result)} onClose={() => setDialogOpen(false)} />;
      case 1: return <UsersDialog result={(result) => setResult(result)} onClose={() => setDialogOpen(false)} />;
      case 2: return <LocationsDialog result={(result) => setResult(result)} onClose={() => setDialogOpen(false)} />;
      default: return <></>;
    }
  };

  return (
    <AdminContext.Provider value={{ isChanged }}>
      {dialogResult && <Notification {...dialogResult} afterClose={() => setDialogResult(null)} />}
      <Card className={classes.header}>
        <Menu length={length} checkPages={currPage => setPage(currPage)} />
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label='Vehicles' component={Link} to={paths[0]} />
          <Tab label='Users' component={Link} to={paths[1]} />
          <Tab label='Locations' component={Link} to={paths[2]} />
          <Tab label='Orders' component={Link} to={paths[3]} />
        </Tabs>
      </Card>
      <section className={styles.content}>
        <Switch>  
          <Route exact path={paths[0]}>
            <TabPanel value={tab} index={0}>
              <Vehicles page={page} checkPages={value => setLength(value)} />
            </TabPanel>
          </Route>
          <Route exact path={paths[1]}>
            <TabPanel value={tab} index={1}>
              <Users page={page} checkPages={value => setLength(value)} />
            </TabPanel>
          </Route>
          <Route exact path={paths[2]}>
            <TabPanel value={tab} index={2}>
              <Locations page={page} checkPages={value => setLength(value)} />
            </TabPanel>
          </Route>
          <Route exact path={paths[3]}>
            <TabPanel value={tab} index={3}>
              <Orders page={page} checkPages={value => setLength(value)} />
            </TabPanel>
          </Route>
        </Switch>
      </section>
      <Zoom in={tab !== 3} timeout={200} unmountOnExit>
        <Fab className={classes.fab} color="primary" onClick={() => setDialogOpen(true)}>
          <AddIcon />
        </Fab>
      </Zoom>
      {isDialogOpen && getModal()}
    </AdminContext.Provider>
  );
};

export default Admin;