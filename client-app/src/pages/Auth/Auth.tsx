import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Box, Card, Tab, Tabs, Typography } from '@material-ui/core';

import SignIn from '../../components/SignIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';
import styles from './auth.module.scss';

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
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const Auth = () => {
  const [value, setValue] = useState(0);

  return (
    <Card className={styles.wrapper_auth}>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>
      <SwipeableViews index={value} onChangeIndex={index => setValue(index)}>
        <TabPanel value={value} index={0}>
          <SignIn />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp />
        </TabPanel>
      </SwipeableViews>
    </Card>
  );
};

export default Auth;