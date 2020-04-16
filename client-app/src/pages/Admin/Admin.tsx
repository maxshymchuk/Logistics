import { Box, Card, Tab, Tabs, Typography, Zoom } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Locations from '../../admin/components/Locations/Locations';
import Menu from '../../admin/components/Menu/Menu';
import Orders from '../../admin/components/Orders/Orders';
import Users from '../../admin/components/Users/Users';
import Vehicles from '../../admin/components/Vehicles/Vehicles';
import { isSomeEnum } from '../../helpers/typeGuard';
import { AdminContext } from '../../stores/Admin/AdminStore';
import styles from './admin.module.scss';
import LocationsDialog from './dialogs/LocationsDialog';
import UsersDialog from './dialogs/UsersDialog';
import { VehiclesDialog } from './dialogs/VehiclesDialog';

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

enum Path {
  Vehicles = '/admin/vehicles',
  Users = '/admin/users',
  Locations = '/admin/locations',
  Orders = '/admin/orders'
}

const tabs = [
  Path.Vehicles,
  Path.Users,
  Path.Locations,
  Path.Orders
];

const Admin = observer(() => {
  const classes = useStyles();

  const adminStore = useContext(AdminContext);

  useEffect(() => {
    if (isSomeEnum(Path)(window.location.pathname)) {
      adminStore.setTab(tabs.indexOf(window.location.pathname));
    }
  }, []);

  const getDialog = () => {
    switch (adminStore.currentTab) {
      case 0: return <VehiclesDialog />;
      case 1: return <UsersDialog />;
      case 2: return <LocationsDialog />;
      default: return null;
    }
  };

  return (
    <>
      <Card className={classes.header}>
        <Menu />
        <Tabs
          value={adminStore.currentTab}
          onChange={(e, v) => adminStore.setTab(v)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label='Vehicles' component={Link} to={Path.Vehicles} />
          <Tab label='Users' component={Link} to={Path.Users} />
          <Tab label='Locations' component={Link} to={Path.Locations} />
          <Tab label='Orders' component={Link} to={Path.Orders} />
        </Tabs>
      </Card>
      <section className={styles.content}>
        <Switch>  
          <Route exact path={Path.Vehicles}>
            <TabPanel value={adminStore.currentTab} index={0}>
              <Vehicles />
            </TabPanel>
          </Route>
          <Route exact path={Path.Users}>
            <TabPanel value={adminStore.currentTab} index={1}>
              <Users />
            </TabPanel>
          </Route>
          <Route exact path={Path.Locations}>
            <TabPanel value={adminStore.currentTab} index={2}>
              <Locations />
            </TabPanel>
          </Route>
          <Route exact path={Path.Orders}>
            <TabPanel value={adminStore.currentTab} index={3}>
              <Orders />
            </TabPanel>
          </Route>
        </Switch>
      </section>
      <Zoom in={adminStore.currentTab !== tabs.indexOf(Path.Orders)} timeout={200} unmountOnExit>
        <Fab className={classes.fab} color="primary" onClick={() => adminStore.dialog.open()}>
          <AddIcon />
        </Fab>
      </Zoom>
      {adminStore.dialog.isOpen && getDialog()}
    </>
  );
});

export default Admin;