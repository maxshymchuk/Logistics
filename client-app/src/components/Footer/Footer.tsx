import React from "react";

import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <section className={styles.wrapper_footer}>
        <div className={styles.content}>
          <div className={styles.description}>
            <div className={styles.logo}></div>
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
              <a href="/">Home</a>
              <a href="/#about">About Us</a>
              <a href="/#service">Service</a>
              <a href="/#reviews">Reviews</a>
              <a href="/#news">News</a>
              <a href="/#contact">Contact</a>
            </div>
            <div className={styles.services}>
              <article className={styles.title}>Services</article>
              <a href="#">Road Transport</a>
              <a href="#">Sea Freight</a>
              <a href="#">Air Freight</a>
              <a href="#">Logistics</a>
              <a href="#">Cargo Insurance</a>
              <a href="#">Warehousing</a>
            </div>
            <div className={styles.company}>
              <article className={styles.title}>Company</article>
              <a href="#">Careers</a>
              <a href="#">Our Team</a>
              <a href="#">Help</a>
              <a href="#">Branding</a>
              <a href="#">Awards</a>
              <a href="#">Leadership</a>
            </div>
          </section>
          <div className={styles.download}>
            <article className={styles.title}>Download</article>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <article className={styles.subtitle}>Get trackinff app</article>
            <section className={styles.badges}>
              <div className={styles.google}></div>
              <div className={styles.apple}></div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};
