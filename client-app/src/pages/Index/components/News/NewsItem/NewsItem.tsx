import React from 'react';

import { Button, Card, CardActions, CardMedia, Typography } from '@material-ui/core';

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
      <CardMedia className={styles.image} image={image}>
        <section className={styles.content}>
          <div className={styles.text}>
            <Typography className={styles.date} variant="subtitle1" component="article">
              {date.toLocaleDateString()}
            </Typography>
          </div>
          <div className={styles.text}>
            <article className={styles.title}>{title}</article>
          </div>
        </section>
        <CardActions className={styles.actions}>
          <Button className={styles.button} color='primary' variant='contained' size="small">
            <a href={source} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Button>
        </CardActions>
      </CardMedia>
    </Card>
  );
};

export default NewsItem;