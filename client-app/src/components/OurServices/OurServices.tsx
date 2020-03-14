import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

import styles from './ourServices.module.scss';

export const OurServices = () => {
  return (
    <div className={styles.service} id="service">
      <section className={styles.wrapper_service}>
        <h1 className={styles.title}>Create Order Right Now</h1>
        <div className={styles.content}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            component={Link}
            to="/create"
          >
            Create order
          </Button>
        </div>
      </section>
    </div>
  );
};
