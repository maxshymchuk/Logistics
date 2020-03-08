import React from 'react';
import styles from './tracker.module.scss';
import TrackOrder from '../../pages/Orders/TrackOrder/TrackOrder';

export const Tracker = () => {
  return (
    <div className={styles.tracker}>
      <section className={styles.wrapper_tracker}>
        <h1 className={styles.title}>Track your Cargos</h1>
        <div className={styles.content}>
          <TrackOrder />
        </div>
      </section>
    </div>
  );
};
