import '@brainhubeu/react-carousel/lib/style.css';
import { IconButton, Typography } from '@material-ui/core';

import React from 'react';

import Carousel from '@brainhubeu/react-carousel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CONSTS from '../../../../helpers/consts';

import styles from './news.module.scss';
import newsContent from './newsContent';
import NewsItem from './NewsItem/NewsItem';

const News = () => {
  const AUTO_PLAY_MS = 8000;
  const ANIMATION_SPEED_MS = 2000;

  return (
    <div className={styles.news} id="news">
      <section className={styles.wrapper_news}>
        <Typography className={styles.title} variant="h2" component="article">
          News
        </Typography>
        <div className={styles.content}>
          <Carousel
            slidesPerPage={3}
            arrowLeft={<IconButton><ArrowBackIcon /></IconButton>}
            arrowRight={<IconButton><ArrowForwardIcon /></IconButton>}
            autoPlay={AUTO_PLAY_MS}
            animationSpeed={ANIMATION_SPEED_MS}
            breakpoints={{
              [CONSTS.NEWS_DOUBLE_PX]: {
                slidesPerPage: 2
              },
              [CONSTS.MOBILE_WIDTH_PX]: {
                slidesPerPage: 1
              }
            }}
            addArrowClickHandler
            stopAutoPlayOnHover
            arrows
            infinite
          >
            {newsContent.map((news, index) => (
              <NewsItem key={index} {...news} />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default News;