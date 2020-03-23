import '@brainhubeu/react-carousel/lib/style.css';

import React from 'react';

import Carousel from '@brainhubeu/react-carousel';
import { Card } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import ReviewItem from './ReviewItem/ReviewItem';
import styles from './testimonials.module.scss';
import { reviewers, reviews } from './testimonialsContent';

const Testimonials = () => {
  return (
    <div className={styles.testimonials} id="reviews">
      <section className={styles.wrapper_testimonials}>
        <h1 className={styles.title}>Testimonials</h1>
        <article className={styles.subtitle}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        </article>
        <Card className={styles.slide}>
          <Carousel
            slidesPerPage={1}
            arrowLeft={<ArrowBackIcon />}
            arrowRight={<ArrowForwardIcon />}
            animationSpeed={0}
            addArrowClickHandler
            stopAutoPlayOnHover
            draggable={false}
            arrows
            infinite
          >
            {reviews.map((review, index) => (
              <ReviewItem
                key={index}
                {...review}
                reviewersPhotos={reviewers}
                reviewer={index}
              />
            ))}
          </Carousel>
        </Card>
      </section>
    </div>
  );
};

export default Testimonials;