import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';

import styles from './ourServices.module.scss';

const OurServices = () => {
  return (
    <div className={styles.service} id="service">
      <section className={styles.wrapper_service}>
        <Typography className={styles.title} variant="h4">
          What are you waiting for?
        </Typography>
        <Button
          className={styles.button}
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to="/create"
        >
          Create order
        </Button>
      </section>
    </div>
  );
};

export default OurServices;