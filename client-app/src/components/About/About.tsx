import React from 'react';

import { Card } from '@material-ui/core';

import styles from './about.module.scss';

const About = () => (
  <div className={styles.about} id="about">
    <section className={styles.wrapper_about}>
      <h1 className={styles.title}>Why are we special?</h1>
      <article className={styles.subtitle}>Listen to us, this is very important!</article>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>First of all, an idea!</h2>
          <p>
            Call &gt; conversation &gt; acceptance? - sounds old-fashioned.
            <Card className={styles.quote}>Acceptance is good, conversation is bad</Card>
            This principle is the basis of the idea, the foundation of innovation.
            <br />
            We tried to make the service unlike the rest.
            <br />
            To do this, we decided:
          </p>
          <ul>
            <li>Ignore existing transportation giants</li>
            <li>Make it as convenient as possible for a person</li>
            <li>To attract talented people and scientists to the development</li>
            <li>Win by quality, not quantity</li>
          </ul>
          <h2>Max Shymchuk</h2>
        </div>
        <div className={styles.photos}>
          <div className={styles.photo1} />
          <div className={styles.photo2} />
          <div className={styles.photo3} />
        </div>
      </div>
    </section>
  </div>
);

export default About;