import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card } from '@material-ui/core';

import SignIn from '../../../components/SignIn/SignIn';
import styles from './error403.module.scss';

const quotes = [
  'Let me teach you the ways of magic!',
  'I got quests!',
  'Magic waits for no one, apprentice!',
  'Still working on that quest?',
  'Sooooo... how are things?',
  'Hey, best friend!',
  'Hocus pocus!',
  'Ahhh!',
  'Ha-HA!'
];

const Error403 = () => {
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    setQuote(quotes[Math.trunc(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className={styles.error_wrapper}>
      <div className={styles.message}>
        <div className={styles.robot}></div>
        <span className={styles.text}>You shall not pass!</span>
      </div>
      <Card className={styles.auth}>
        <article className={styles.title}>
          Prove yourself
        </article>
        <SignIn />
        <section className={styles.registration}>
          New to Shuttle? <Button size='small' color="primary" component={Link} to='/login'>Sign Up</Button>
        </section>
      </Card>
    </div>
  );
};

export default Error403;
