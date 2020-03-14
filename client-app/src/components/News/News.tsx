import '@brainhubeu/react-carousel/lib/style.css';

import React from 'react';

import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styles from './news.module.scss';
import { news } from './newsContent';
import { NewsItem } from './NewsItem/NewsItem';

export const News = () => {
  const AUTO_PLAY_MS = 8000;
  const ANIMATION_SPEED_MS = 2000;
  const TABLET_WIDTH_PX = 600;
  const MOBILE_WIDTH_PX = 500;

  return (
    <div className={styles.news} id="news">
      <section className={styles.wrapper_news}>
        <h1 className={styles.title}>Latest News For You</h1>
        <article className={styles.subtitle}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </article>
        <div className={styles.content}>
          <Carousel
            slidesPerPage={3}
            arrowLeft={<ArrowBackIcon className={styles.arrow} />}
            arrowRight={<ArrowForwardIcon className={styles.arrow} />}
            autoPlay={AUTO_PLAY_MS}
            animationSpeed={ANIMATION_SPEED_MS}
            breakpoints={{
              [TABLET_WIDTH_PX]: {
                slidesPerPage: 2
              },
              [MOBILE_WIDTH_PX]: {
                slidesPerPage: 1
              }
            }}
            addArrowClickHandler
            stopAutoPlayOnHover
            arrows
            infinite
          >
            {news.map((news, index) => (
              <NewsItem key={index} {...news} />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
};
