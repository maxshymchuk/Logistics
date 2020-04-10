import '@brainhubeu/react-carousel/lib/style.css';

import React from 'react';
import { HashLink } from 'react-router-hash-link';

import Carousel from '@brainhubeu/react-carousel';
import { Button } from '@material-ui/core';

import smoothScroll from '../../../../helpers/smoothScroll';
import styles from './header.module.scss';

const Header = () => (
  <div className={styles.header} id="top">
    <div className={styles.content}>
      <Carousel slidesPerPage={1} autoPlay={8000} animationSpeed={2000} draggable={false} infinite>
        <div className={styles.airplane} />
        <div className={styles.train} />
        <div className={styles.ship} />
        <div className={styles.truck} />
        <div className={styles.rocket} />
        <div className={styles.normandy} />
      </Carousel>
      <div className={styles.layer}>
        <article className={styles.title}>
          We Provide The Best
          <br />
          Transport & Logistics Service
        </article>
        <article className={styles.subtitle}>
          Fast. Effective. Comfortable. Simple.
          <br />
          Sounds powerful, doesn&apos;t it?
        </article>
        <Button
          color="primary"
          variant="contained"
          className={styles.button}
          component={HashLink}
          scroll={smoothScroll}
          to="/#about"
        >
          Let&apos;s find out how we did it
        </Button>
      </div>
    </div>
  </div>
);

export default Header;