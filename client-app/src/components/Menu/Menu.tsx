import React, { useState } from 'react';
import FaceIcon from '@material-ui/icons/Face';
import styles from './menu.module.scss';
import CommuteIcon from '@material-ui/icons/Commute';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Drawer, makeStyles } from '@material-ui/core';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { MenuList } from './MenuList/MenuList';

configureAnchors({ offset: -50, scrollDuration: 800 });

const useStyles = makeStyles(() => ({
  modal: {
    background: 'none'
  },
  paper: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    backdropFilter: 'blur(5px)',
    color: '#FFF'
  }
}));

export const Menu = () => {
  const classes = useStyles();
  const [isDrawerOpened, handleDrawer] = useState(false);

  return (
    <>
      {/* <ScrollableAnchor id='top'> */}
      <div className={styles.social}>
        <section className={styles.wrapper_social}>
          <div className={styles.info}>
            <section className={styles.phone}>
              <PhoneInTalkIcon />
              <span>012345-6789-0</span>
            </section>
            <section className={styles.date}>
              <ScheduleIcon />
              <span>Mon-Sun 9.00AM to 10.00PM</span>
            </section>
          </div>
          <section className={styles.social_networks}>
            <div className={styles.social_network_logo}></div>
            <div className={styles.social_network_logo}></div>
            <div className={styles.social_network_logo}></div>
            <div className={styles.social_network_logo}></div>
            <div className={styles.social_network_logo}></div>
          </section>
        </section>
      </div>
      <div className={styles.menu}>
        <section className={styles.wrapper_menu}>
          <div className={styles.logo}></div>
          <div className={styles.menu_list}>
            <MenuList direction='row' />
          </div>
          <div className={styles.user}>
            <IconButton>
              <FaceIcon />
            </IconButton>
            <IconButton>
              <CommuteIcon />
            </IconButton>
            <IconButton className={styles.burger} onClick={() => handleDrawer(!isDrawerOpened)}>
              <MenuIcon />
            </IconButton>
          </div>
          <Drawer
            classes={classes}
            anchor='top'
            open={isDrawerOpened}
            onClose={() => handleDrawer(!isDrawerOpened)}
            transitionDuration={800}
          >
            <MenuList direction='column' callback={handleDrawer} />
          </Drawer>
        </section>
      </div>
      {/* </ScrollableAnchor> */}
    </>
  );
};
