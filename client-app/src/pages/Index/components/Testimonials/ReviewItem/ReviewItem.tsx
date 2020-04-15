import { Card, Typography } from '@material-ui/core';
import React from 'react';
import { Review } from '../testimonialsContent';

import styles from './reviewItem.module.scss';

type ReviewItemProps = {
  review: Review;
};

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className={styles.review_item}>
      <Card className={styles.photos}>
        <img
          className={styles.reviewer}
          src={review.photo}
          key={review.photo}
          alt='Reviewer'
        />
      </Card>
      <section className={styles.content}>
        <Typography className={styles.title} variant="subtitle1" component="article">
          {review.title}
        </Typography>
        <Typography className={styles.text} variant="body1" component="p">
          {review.text}
        </Typography>
      </section>
    </div>
  );
};

export default ReviewItem;