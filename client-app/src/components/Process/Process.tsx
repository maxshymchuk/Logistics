import React from 'react';
import styles from './process.module.scss';
import { Card } from '@material-ui/core';

export const Process = () => {
  return (
    <div className={styles.process}>
      <section className={styles.wrapper_process}>
        <h1 className={styles.title}>Our Working Process</h1>
        <article className={styles.subtitle}>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</article>
        <div className={styles.content}>
          <div className={styles.step}>
            <Card className={styles.image}></Card>
            <article className={styles.title}>Taking the Order</article>
          </div>
          <div className={styles.step}>
            <article className={styles.title}>Manage the Order</article>
            <Card className={styles.image}></Card>
          </div>
          <div className={styles.step}>
            <Card className={styles.image}></Card>
            <article className={styles.title}>Shipment</article>
          </div>
          <div className={styles.step}>
            <article className={styles.title}>Warehousing</article>
            <Card className={styles.image}></Card>
          </div>
          <div className={styles.step}>
            <Card className={styles.image}></Card>
            <article className={styles.title}>Transportation</article>
          </div>
          <div className={styles.step}>
            <article className={styles.title}>Delivery to the door</article>
            <Card className={styles.image}></Card>
          </div>
        </div>
      </section>
    </div>
  );
};
