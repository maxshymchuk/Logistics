import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Fade, Typography } from '@material-ui/core';

import styles from './orderComplete.module.scss';

type OrderCompleteProps = {
  trackNumber: string;
  createNewOrder: () => void
};

const OrderComplete = ({ trackNumber, createNewOrder }: OrderCompleteProps) => {
  return (
    <Fade in timeout={2000} unmountOnExit>
      <div className={styles.content}>
        <ul className={styles.circles}>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
        <div className={styles.congratulation}>
          <Typography variant="h4">
            Order has been created
          </Typography>
          <section className={styles.track}>
            <Typography variant="subtitle1">
              Your track number
            </Typography>
            <span className={styles.track_number}>
              {trackNumber}
            </span>
            <span className={styles.help}>
              Use this code to track your parcels
            </span>
          </section>
          <section className={styles.buttons}>
            <Button className={styles.button_order} size='small' onClick={createNewOrder} color='primary' variant='contained'>Make another order</Button>
            <Button className={styles.button_profile} size='small' component={Link} to='/profile' color='primary' variant='outlined'>Go to profile</Button>
          </section>
        </div>
      </div>
    </Fade>
  );
};

export default OrderComplete;