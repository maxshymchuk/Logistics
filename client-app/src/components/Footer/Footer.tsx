import React from 'react';

import { Link } from '@material-ui/core';

import styles from './footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <section className={styles.wrapper_footer}>
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.logo} />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              mollitia sunt perspiciatis nam sapiente magni similique temporibus
              qui maiores, incidunt provident adipisci obcaecati praesentium
              totam ab corporis quis ipsa autem?
            </p>
          </div>
          <section className={styles.nav}>
            <div className={styles.links}>
              <article className={styles.title}>Links</article>
              <Link color="inherit" href='/#top' underline='none'>
                Home
              </Link>
              <Link color="inherit" href='/#about' underline='none'>
                About Us
              </Link>
              <Link color="inherit" href='/#service' underline='none'>
                Service
              </Link>
              <Link color="inherit" href='/#reviews' underline='none'>
                Reviews
              </Link>
              <Link color="inherit" href='/#news' underline='none'>
                News
              </Link>
              <Link color="inherit" href='/#contact' underline='none'>
                Contact
              </Link>
            </div>
            <div className={styles.services}>
              <article className={styles.title}>Services</article>
              <span>Road Transport</span>
              <span>Sea Freight</span>
              <span>Air Freight</span>
              <span>Logistics</span>
              <span>Cargo Insurance</span>
              <span>Warehousing</span>
            </div>
            <div className={styles.company}>
              <article className={styles.title}>Company</article>
              <span>Careers</span>
              <span>Our Team</span>
              <span>Help</span>
              <span>Branding</span>
              <span>Awards</span>
              <span>Leadership</span>
            </div>
          </section>
          <div className={styles.download}>
            <article className={styles.title}>Download</article>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <article className={styles.subtitle}>Get trackinff app</article>
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