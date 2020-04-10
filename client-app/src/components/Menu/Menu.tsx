import { Drawer, IconButton, makeStyles } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FaceIcon from '@material-ui/icons/Face';
import MenuIcon from '@material-ui/icons/Menu';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import ScheduleIcon from '@material-ui/icons/Schedule';
import useWindowScroll from '@react-hook/window-scroll';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';
import styles from './menu.module.scss';
import MenuList from './MenuList/MenuList';

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

let prev = 0;

const Menu = () => {
  const classes = useStyles();

  const [isDrawerOpened, handleDrawer] = useState(false);

  const context = useContext(LoginContext);

  const scroll = useWindowScroll(10);

  const handleLogout = async () => {
    await context.logout();
  };

  const isScrollDown = () => {
    const comp = scroll - prev;
    prev = scroll;
    return comp > 0;
  };

  const isOnTop = () => {
    const MENU_UNDOCK_POS = 50;
    return scroll < MENU_UNDOCK_POS;
  };

  const isIndexPage = () => {
    return window.location.pathname === '/';
  };

  const getMenuStyle = () => {
    const style = [styles.menu];
    if (isIndexPage() && isOnTop()) {
      style.push(styles.docked);
    } else if (isScrollDown()) {
      style.push(styles.hided);
    }
    return style.join(' ');
  };

  return (
    <>
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
            <div className={styles.social_behance} />
            <div className={styles.social_vk} />
            <div className={styles.social_facebook} />
            <div className={styles.social_twitter} />
            <div className={styles.social_instagram} />
          </section>
        </section>
      </div>
      <div className={getMenuStyle()}>
        <section className={styles.wrapper_menu}>
          <div className={`${styles.logo} ${!isOnTop() ? styles.colorful : ''}`} />
          <div className={styles.menu_list}>
            <MenuList direction="row" />
          </div>
          <div className={styles.user}>
            <LoginContext.Consumer>
              {(value) => (value.isLogged ? (
                <>
                  <IconButton component={Link} to="/profile">
                    <FaceIcon />
                  </IconButton>
                  <IconButton onClick={handleLogout}>
                    <ExitToAppIcon />
                  </IconButton>
                </>
              ) : (
                <IconButton component={Link} to="/login">
                  <FaceIcon />
                </IconButton>
              ))}
            </LoginContext.Consumer>
            <IconButton
              className={styles.burger}
              onClick={() => handleDrawer(!isDrawerOpened)}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <Drawer
            classes={classes}
            anchor="top"
            open={isDrawerOpened}
            onClose={() => handleDrawer(!isDrawerOpened)}
            transitionDuration={800}
          >
            <MenuList direction="column" callback={handleDrawer} />
          </Drawer>
        </section>
      </div>
    </>
  );
};

export default Menu;