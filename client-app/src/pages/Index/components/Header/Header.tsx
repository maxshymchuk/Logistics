import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Button, Typography } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import React from 'react';
import { HashLink } from 'react-router-hash-link';

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
        <Typography variant="h4" component="article" className={styles.title}>
          We Provide The Best
          <br />
          Transport & Logistics Service
        </Typography>
        <Typography variant="subtitle1" component="article" className={styles.subtitle}>
          Fast. Effective. Comfortable. Simple.
          <br />
          Sounds powerful, doesn&apos;t it?
        </Typography>
        <Button
          color="primary"
          className={styles.button}
          component={HashLink}
          scroll={smoothScroll}
          to="/#about"
        >
          <div className={styles.content}>
            <div>So how did we do that?</div>
            <KeyboardArrowDownIcon fontSize="small" />
          </div>
        </Button>
      </div>
    </div>
  </div>
);

export default Header;