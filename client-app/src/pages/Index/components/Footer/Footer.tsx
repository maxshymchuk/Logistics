import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import smoothScroll from '../../../../helpers/smoothScroll';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <section className={styles.wrapper_footer}>
        <div className={styles.description}>
          <div className={styles.logo} />
          <div className={styles.logo_research} />
        </div>
        <div className={styles.content}>
          <section className={styles.nav}>
            <Button variant='outlined' color='primary' component={Link} to='/#top' scroll={smoothScroll}>
              Home
            </Button>
            <Button variant='outlined' color='primary' component={Link} to='/#about' scroll={smoothScroll}>
              About Us
            </Button>
            <Button variant='outlined' color='primary' component={Link} to='/#service' scroll={smoothScroll}>
              Service
            </Button>
            <Button variant='outlined' color='primary' component={Link} to='/#reviews' scroll={smoothScroll}>
              Reviews
            </Button>
            <Button variant='outlined' component={Link} to='/#news' scroll={smoothScroll}>
              News
            </Button>
          </section>
          <div className={styles.download}>
            <Typography className={styles.title} variant="h5" component="article">
              Get mobile app
            </Typography>
            <section className={styles.badges}>
              <div className={styles.google} />
              <div className={styles.apple} />
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;