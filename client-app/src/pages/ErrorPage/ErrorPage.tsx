import React, { useEffect, useState } from 'react';

import styles from './errorPage.module.scss';

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

const ErrorPage = () => {
  const [quote, setQuote] = useState('');
  
  useEffect(() => {
    setQuote(quotes[Math.trunc(Math.random() * quotes.length)]);
  }, []);

  return (
    <div className={styles.error_wrapper}>
      <section className={styles.message}>
        <article className={styles.title}>
          404
        </article>
        <article className={styles.subtitle}>
          Sorry, but CL4P-TP can&apos;t open doors you want :(
        </article>
      </section>
      <span className={styles.quote}>
        {quote}
      </span>
    </div>
  );
};

export default ErrorPage;
