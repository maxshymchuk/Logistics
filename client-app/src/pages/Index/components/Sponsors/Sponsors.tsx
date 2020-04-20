import { Typography } from '@material-ui/core';
import React from 'react';
import boston from '../../../../assets/index/sponsors/boston.svg';
import facebook from '../../../../assets/index/sponsors/facebook.svg';
import gai from '../../../../assets/index/sponsors/gai.png';
import microsoft from '../../../../assets/index/sponsors/microsoft.svg';
import robco from '../../../../assets/index/sponsors/robco.png';
import spacex from '../../../../assets/index/sponsors/spacex.svg';
import tesla from '../../../../assets/index/sponsors/tesla.svg';
import amazon from '../../../../assets/index/sponsors/amazon.svg';

import styles from './sponsors.module.scss';

const Sponsors = () => {
  return (
    <div className={styles.sponsors}>
      <section className={styles.wrapper_sponsors}>
        <Typography className={styles.title} variant="h2" component="article">
          Our sponsors
        </Typography>
        <Typography className={styles.subtitle} variant="subtitle1" component="article">
          and investors
        </Typography>
        <div className={styles.content}>
          <div className={styles.sponsor}>
            <img src={tesla} alt="Tesla Motors" />
          </div>
          <div className={styles.sponsor}>
            <img src={microsoft} alt="Microsoft" />
          </div>
          <div className={styles.sponsor}>
            <img src={facebook} alt="Facebook" />
          </div>
          <div className={styles.sponsor}>
            <img src={spacex} alt="SpaceX" />
          </div>
          <div className={styles.sponsor}>
            <img src={gai} alt="General Atomics International" />
          </div>
          <div className={styles.sponsor}>
            <img src={robco} alt="RobCo Industries" />
          </div>
          <div className={styles.sponsor}>
            <img src={boston} alt="Boston Dynamics" />
          </div>
          <div className={styles.sponsor}>
            <img src={amazon} alt="Amazon" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;