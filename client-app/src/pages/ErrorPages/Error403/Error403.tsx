import { Button, Card } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import SignIn from '../../Auth/components/SignIn/SignIn';
import styles from './error403.module.scss';

const Error403 = () => {
  return (
    <div className={styles.error_wrapper}>
      <div className={styles.message}>
        <div className={styles.robot} />
        <span className={styles.text}>You shall not pass!</span>
      </div>
      <Card className={styles.auth}>
        <article className={styles.title}>
          Prove yourself
        </article>
        <SignIn />
        <section className={styles.registration}>
          New to Shuttle? 
          {' '}
          <Button size='small' color="primary" component={Link} to='/login'>Sign Up</Button>
        </section>
      </Card>
    </div>
  );
};

export default Error403;
