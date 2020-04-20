import { Button, Card, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import SignIn from '../../Auth/components/SignIn/SignIn';
import styles from './error403.module.scss';

const Error403 = () => {
  return (
    <div className={styles.error_wrapper}>
      <div className={styles.robot} />
      <Card className={styles.auth}>
        <Typography className={styles.title} variant="h5" component="article">
          Prove yourself
        </Typography>
        <SignIn />
        <section className={styles.registration}>
          New to Shuttle? 
          <Button size='small' color="primary" component={Link} to='/login'>Sign Up</Button>
        </section>
      </Card>
    </div>
  );
};

export default Error403;
