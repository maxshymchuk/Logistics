import { Card } from '@material-ui/core';
import React from 'react';
import mrhandy from '../../../../assets/robots/handy1.png';
import styles from './about.module.scss';

const About = () => (
  <div className={styles.about} id="about">
    <section className={styles.row}>
      <h1 className={styles.title}>Why are we special?</h1>
      <article className={styles.subtitle}>Listen to us, this is very important!</article>
    </section>
    <section className={styles.row}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2>First of all, an idea!</h2>
          <div>
            Call &gt; conversation &gt; acceptance? - sounds old-fashioned.
            <div className={styles.quote}>
              QUOTE
            </div>
            This principle is the basis of the idea, the foundation of innovation.
            <br />
            We tried to make the service unlike the rest.
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <img className={styles.photo} src={mrhandy} alt='Mr Handy robot' />
      </div>
    </section>
    <section className={styles.row}>
      <div className={styles.content}>
        <div className={styles.text}>
          To do this, we decided:
          <ul>
            <li>Ignore existing transportation giants</li>
            <li>Make it as convenient as possible for a person</li>
            <li>To attract talented people and scientists to the development</li>
            <li>Win by quality, not quantity</li>
          </ul>
          <h2>Max Shymchuk</h2>
        </div>
      </div>
    </section>
  </div>
);

export default About;