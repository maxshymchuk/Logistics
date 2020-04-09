import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import smoothScroll from '../../../helpers/smoothScroll';
import appStore from '../../../stores/AppStore';
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
      {appStore.user?.isAdmin && (
        <Button onClick={callback} color="inherit" component={Link} to='/admin/vehicles'>
          Admin
        </Button>
      )}
      <Button onClick={runCallback} color="inherit" component={Link} scroll={smoothScroll} to='/#top'>
        Home
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={smoothScroll} to='/#about'>
        About
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={smoothScroll} to='/#service'>
        Service
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={smoothScroll} to='/#reviews'>
        Reviews
      </Button>
      <Button onClick={runCallback} color="inherit" component={Link} scroll={smoothScroll} to='/#news'>
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