import React from 'react';

import OrderTrack from '../../../Orders/OrderTrack/OrderTrack';
import styles from './tracker.module.scss';

const Tracker = () => {
  return (
    <div className={styles.tracker}>
      <section className={styles.wrapper_tracker}>
        <h1 className={styles.title}>Track your Cargo</h1>
        <div className={styles.content}>
          <OrderTrack />
        </div>
      </section>
    </div>
  );
};

export default Tracker;