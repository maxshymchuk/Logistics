import { Box, Card, Tab, Tabs, Typography, Zoom } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Menu from '../../admin/components/Menu/Menu';
import Vehicles from '../../admin/components/Vehicles/Vehicles';
import { AdminContext } from '../../stores/Admin/AdminStore';
import styles from './admin.module.scss';
import { LocationsDialog } from './dialogs/LocationsDialog';
import { UsersDialog } from './dialogs/UsersDialog';
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

enum Paths {
  Vehicles = '/admin/vehicles',
  Users = '/admin/users',
  Locations = '/admin/locations',
  Orders = '/admin/orders'
}

const paths = [
  Paths.Vehicles,
  Paths.Users,
  Paths.Locations,
  Paths.Orders
]

const Admin = observer(() => {
  const classes = useStyles();

  // const [tab, setTab] = useState(
  //   isSomeEnum(Paths)(window.location.pathname)
  //   // paths.indexOf(window.location.pathname)
  // );

  const adminStore = useContext(AdminContext);

  // useEffect(() => {
  //   setPage(1);
  // }, [tab]);

  // const setResult = (result: ServerResponse<any>) => {
  //   setDialogResult(result);
  // };

  const getModal = () => {
    switch (adminStore.currentTab) {
      case 0: return <VehiclesDialog />;
      case 1: return <UsersDialog />;
      case 2: return <LocationsDialog />;
      default: return <></>;
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
          <Tab label='Vehicles' component={Link} to={Paths.Vehicles} />
          <Tab label='Users' component={Link} to={Paths.Users} />
          <Tab label='Locations' component={Link} to={Paths.Locations} />
          <Tab label='Orders' component={Link} to={Paths.Orders} />
        </Tabs>
      </Card>
      <section className={styles.content}>
        <Switch>  
          <Route exact path={Paths.Vehicles}>
            <TabPanel value={adminStore.currentTab} index={0}>
              <Vehicles />
            </TabPanel>
          </Route>
          <Route exact path={Paths.Users}>
            <TabPanel value={adminStore.currentTab} index={1}>
              {/*<Users page={page} checkPages={value => setLength(value)} />*/}
            </TabPanel>
          </Route>
          <Route exact path={Paths.Locations}>
            <TabPanel value={adminStore.currentTab} index={2}>
              {/*<Locations page={page} checkPages={value => setLength(value)} />*/}
            </TabPanel>
          </Route>
          <Route exact path={Paths.Orders}>
            <TabPanel value={adminStore.currentTab} index={3}>
              {/*<Orders page={page} checkPages={value => setLength(value)} />*/}
            </TabPanel>
          </Route>
        </Switch>
      </section>
      <Zoom in={adminStore.currentTab !== 3} timeout={200} unmountOnExit>
        <Fab className={classes.fab} color="primary" onClick={() => adminStore.dialog.open()}>
          <AddIcon />
        </Fab>
      </Zoom>
      {adminStore.dialog.isOpen && getModal()}
    </>
  );
});

export default Admin;