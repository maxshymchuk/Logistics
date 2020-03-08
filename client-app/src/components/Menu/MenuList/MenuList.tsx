import Button from '@material-ui/core/Button';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import styles from './menuList.module.scss';

type MenuListProps = {
  direction: 'row' | 'column';
  callback?: any;
};

export const MenuList = (props: MenuListProps) => {
  return (
    <section className={styles.menu_list} style={{ flexDirection: props.direction }}>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#top'>Home</a>
      </Button>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#about'>About</a>
      </Button>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#service'>Service</a>
      </Button>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#reviews'>Reviews</a>
      </Button>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#news'>News</a>
      </Button>
      <Button onClick={() => props.callback && props.callback()} color='inherit'>
        <a href='/#contact'>Contact</a>
      </Button>
      {props.callback && (
        <div className={styles.drawer_close}>
          <CloseIcon fontSize='large' onClick={() => props.callback()} />
        </div>
      )}
    </section>
  );
};
