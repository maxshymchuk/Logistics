import { Typography } from '@material-ui/core';
import React from 'react';

import OrderTrack from '../../../Orders/OrderTrack/OrderTrack';
import styles from './tracker.module.scss';

const Tracker = () => {
  return (
    <div className={styles.tracker}>
      <section className={styles.wrapper_tracker}>
        <Typography className={styles.title} variant="h4">
          And you can track your cargo!
        </Typography>
        <div className={styles.content}>
          <OrderTrack />
        </div>
      </section>
    </div>
  );
};

export default Tracker;