import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import styles from './orderComplete.module.scss';

type OrderCompleteProps = {
  trackNumber: string;
  createNewOrder: () => void
};

const OrderComplete = ({ trackNumber, createNewOrder }: OrderCompleteProps) => {
  return (
    <div className={styles.content}>
      <div className={styles.congratulation}>
        <span className={styles.title}>Order has been created</span>
        <section className={styles.track}>
          <article className={styles.subtitle}>Your track number</article>
          <span className={styles.track_number}>
            {trackNumber}
          </span>
          <span className={styles.help}>
            Use this code to track your parcels
          </span>
        </section>
        <section className={styles.buttons}>
          <Button size='small' onClick={createNewOrder} color='primary' variant='contained'>Make another order</Button>
          <Button size='small' component={Link} to='/profile' color='primary' variant='outlined'>Go to profile</Button>
        </section>
      </div>
    </div>
  );
};

export default OrderComplete;