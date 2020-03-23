import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { LoginContext, scrollOffset } from '../../../App';
import styles from './menuList.module.scss';

type MenuListProps = {
  direction: 'row' | 'column';
  callback?: any;
};

const MenuList = ({ direction, callback }: MenuListProps) => {
  const runCallback = () => {
    if (callback) callback();
  };

  return (
    <section
      className={styles.menu_list}
      style={{ flexDirection: direction }}
    >
      <LoginContext.Consumer>
        {value =>
          value.user?.isAdmin && (
            <Button onClick={callback} color="inherit" component={Link} to='/admin/vehicles'>
              Admin
            </Button>
          )}
      </LoginContext.Consumer>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={scrollOffset} to='/#top'>
        Home
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={scrollOffset} to='/#about'>
        About
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={scrollOffset} to='/#service'>
        Service
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={scrollOffset} to='/#reviews'>
        Reviews
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={scrollOffset} to='/#news'>
        News
      </Button>
      {callback && (
        <div className={styles.drawer_close}>
          <CloseIcon fontSize="large" onClick={() => runCallback()} />
        </div>
      )}
    </section>
  );
};

export default MenuList;