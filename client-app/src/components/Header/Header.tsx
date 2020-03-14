import '@brainhubeu/react-carousel/lib/style.css';

import React from 'react';

import Carousel from '@brainhubeu/react-carousel';
import { Button } from '@material-ui/core';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header} id='top'>
      <div className={styles.content}>
        <Carousel
          slidesPerPage={1}
          autoPlay={8000}
          animationSpeed={2000}
          draggable={false}
          infinite
        >
          <div className={styles.airplane}></div>
          <div className={styles.train}></div>
          <div className={styles.ship}></div>
          <div className={styles.truck}></div>
        </Carousel>
        <div className={styles.layer}>
          <article className={styles.title}>
            We Provide The Best <br /> Transport & Logistics Service
          </article>
          <article className={styles.subtitle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sed
            expedita doloribus alias aliquid eaque. Reiciendis corrupti ipsa eos
            vero labore quas maxime earum? Quae doloribus eum perferendis aut
            totam!
          </article>
          <Button color="primary" variant="contained" className={styles.button}>
            <a href="/#about">Learn More</a>
          </Button>
        </div>
      </div>
    </div>
  );
};
