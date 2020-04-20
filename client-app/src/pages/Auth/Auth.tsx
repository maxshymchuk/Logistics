import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { Box, Card, Fade, Tab, Tabs, Typography } from '@material-ui/core';

import styles from './auth.module.scss';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

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
    <Fade in timeout={2000} unmountOnExit>
      <div className={styles.auth}>
        <div className={styles.wrapper_auth}>
          <Card>
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
        </div>
      </div>
    </Fade>
  );
};

export default Auth;