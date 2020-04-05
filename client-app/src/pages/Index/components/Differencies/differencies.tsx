import React from 'react';

import { Card } from '@material-ui/core';

import styles from './differencies.module.scss';

const Differencies = () => {
  return (
    <div className={styles.differencies}>
      <section className={styles.wrapper_differencies}>
        <h1 className={styles.title}>What Makes Us Different</h1>
        <article className={styles.subtitle}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </article>
        <div className={styles.content}>
          <div className={styles.images}>
            <Card className={styles.opportunity}>
              <div className={styles.image} />
              <article className={styles.title}>24/7 support</article>
            </Card>
            <Card className={styles.opportunity}>
              <div className={styles.image} />
              <article className={styles.title}>On Time Delivery</article>
            </Card>
            <Card className={styles.opportunity}>
              <div className={styles.image} />
              <article className={styles.title}>Europe Service</article>
            </Card>
            <Card className={styles.opportunity}>
              <div className={styles.image} />
              <article className={styles.title}>Safe & Secure</article>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Differencies;