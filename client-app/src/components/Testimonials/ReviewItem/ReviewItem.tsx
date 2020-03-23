import React from 'react';

import styles from './reviewItem.module.scss';

type ReviewItemProps = {
  date: Date;
  reviewer: number;
  reviewersPhotos: string[];
  text: string;
};

const ReviewItem = ({ date, reviewer, reviewersPhotos, text }: ReviewItemProps) => {
  const reviewersLength = reviewersPhotos.length;
  const side = Math.floor(reviewersLength / 2);
  const photos = reviewersPhotos.map(
    (photo, index, reviewers) =>
      reviewers[
        (reviewersLength + (reviewer + index - side)) % reviewersLength
      ]
  );
  return (
    <div className={styles.review_item}>
      <section className={styles.photos}>
        {photos.map((photo, index) => (
          <img
            className={index === side ? styles.reviewer : undefined}
            src={photo}
            key={index}
            alt='Reviewer'
          />
        ))}
      </section>
      <article className={styles.date}>{date.toDateString()}</article>
      <p className={styles.title}>{text}</p>
    </div>
  );
};

export default ReviewItem;