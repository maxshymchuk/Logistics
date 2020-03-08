import React from 'react';
import styles from './reviewItem.module.scss';

type ReviewItemProps = {
  date: Date;
  reviewer: number;
  reviewersPhotos: string[];
  text: string;
};

export const ReviewItem = (props: ReviewItemProps) => {
  const date = props.date.toDateString();
  const reviewersLength = props.reviewersPhotos.length;
  const side = ~~(reviewersLength / 2);
  const photos = props.reviewersPhotos.map(
    (photo, index, reviewers) => reviewers[(reviewersLength + (props.reviewer + index - side)) % reviewersLength]
  );
  return (
    <div className={styles.review_item}>
      <section className={styles.photos}>
        {photos.map((photo, index) => (
          <img className={index === side ? styles.reviewer : undefined} src={photo} key={index} />
        ))}
      </section>
      <article className={styles.date}>{date}</article>
      <p className={styles.title}>{props.text}</p>
    </div>
  );
};
