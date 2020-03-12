import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";

import styles from "./about.module.scss";

export const About = () => {
  return (
    <ScrollableAnchor id="about">
      <div className={styles.about}>
        <section className={styles.wrapper_about}>
          <h1 className={styles.title}>Know More About Us</h1>
          <article className={styles.subtitle}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </article>
          <div className={styles.content}>
            <div className={styles.text}>
              <h2>Our Mission</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
                facere provident accusantium unde dolor beatae ducimus, odit
                repellat reprehenderit eaque voluptas, illo laborum? Praesentium
                rerum inventore asperiores fuga quibusdam consectetur.
              </p>
              <a>Read More ></a>
              <ul>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </li>
              </ul>
              <h2>Robert Downey</h2>
            </div>
            <div className={styles.photos}>
              <div className={styles.photo1}></div>
              <div className={styles.photo2}></div>
              <div className={styles.photo3}></div>
            </div>
          </div>
        </section>
      </div>
    </ScrollableAnchor>
  );
};
