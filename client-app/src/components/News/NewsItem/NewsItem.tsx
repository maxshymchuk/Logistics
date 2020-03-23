import React from 'react';

import { Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';

import styles from './newsItem.module.scss';

type NewsItemProps = {
  date: Date;
  image: string;
  title: string;
  source: string;
};

const NewsItem = ({ date, image, title, source }: NewsItemProps) => {
  return (
    <Card className={styles.news_item}>
      <CardMedia className={styles.image} image={image} />
      <CardContent className={styles.description}>
        <article className={styles.date}>{date.toDateString()}</article>
        <article className={styles.title}>{title}</article>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button className={styles.button} size="small">
          <a href={source} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsItem;