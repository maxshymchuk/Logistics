import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { Card, IconButton, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import React from 'react';

import ReviewItem from './ReviewItem/ReviewItem';
import styles from './testimonials.module.scss';
import { reviews } from './testimonialsContent';

const Testimonials = () => {
  return (
    <div className={styles.testimonials} id="reviews">
      <section className={styles.wrapper_testimonials}>
        <Typography className={styles.title} variant="h2" component="article">
          Testimonials
        </Typography>
        <div className={styles.slide}>
          <Carousel
            slidesPerPage={1}
            arrowLeft={<IconButton><ArrowBackIcon /></IconButton>}
            arrowRight={<IconButton><ArrowForwardIcon /></IconButton>}
            animationSpeed={800}
            autoPlay={8000}
            addArrowClickHandler
            stopAutoPlayOnHover
            arrows
            infinite
          >
            {reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;