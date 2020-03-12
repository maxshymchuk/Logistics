import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";

import { Box, Tab, Tabs, Typography } from "@material-ui/core";

import { Menu } from "../../admin/components/Menu/Menu";
import UserList from "../../admin/components/Users/UserList";
import VehicleList from "../../admin/components/Vehicles/VehicleList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

export const Admin = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Menu />
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Vehicles" />
        <Tab label="Users" />
        <Tab label="Locations" />
        <Tab label="Orders" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={index => setValue(index)}>
        <TabPanel value={value} index={0}>
          <VehicleList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <UserList />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <UserList />
        </TabPanel>
      </SwipeableViews>
      {/* <Footer /> */}
    </>
  );
};
