import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import React, { useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import smoothScroll from '../../../helpers/smoothScroll';
import { AppContext } from '../../../stores/AppStore';
import styles from './menuList.module.scss';

type MenuListProps = {
  direction: 'row' | 'column';
  onClose?: () => void;
};

const MenuList = ({ direction, onClose }: MenuListProps) => {

  const appStore = useContext(AppContext);

  const closeMenu = () => {
    if (onClose) onClose();
  };

  return (
    <section
      className={styles.menu_list}
      style={{ flexDirection: direction }}
    >
      {appStore.user?.isAdmin && (
        <Button color="inherit" component={Link} to='/admin/vehicles'>
          Admin
        </Button>
      )}
      <Button onClick={closeMenu} color="inherit" component={Link} scroll={smoothScroll} to='/#top'>
        Home
      </Button>
      <Button onClick={closeMenu} color="inherit" component={Link} scroll={smoothScroll} to='/#about'>
        About
      </Button>
      <Button onClick={closeMenu} color="inherit" component={Link} scroll={smoothScroll} to='/#service'>
        Service
      </Button>
      <Button onClick={closeMenu} color="inherit" component={Link} scroll={smoothScroll} to='/#reviews'>
        Reviews
      </Button>
      <Button onClick={closeMenu} color="inherit" component={Link} scroll={smoothScroll} to='/#news'>
        News
      </Button>
      {onClose && (
        <div className={styles.drawer_close}>
          <CloseIcon fontSize="large" onClick={onClose} />
        </div>
      )}
    </section>
  );
};

export default MenuList;