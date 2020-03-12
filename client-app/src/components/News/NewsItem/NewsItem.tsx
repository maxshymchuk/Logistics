import React from "react";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia
} from "@material-ui/core";

import styles from "./newsItem.module.scss";

type NewsItemProps = {
  date: Date;
  image: string;
  title: string;
  source: string;
};

export const NewsItem = (props: NewsItemProps) => {
  const date = props.date.toDateString();
  return (
    <Card className={styles.news_item}>
      <CardMedia className={styles.image} image={props.image} />
      <CardContent className={styles.description}>
        <article className={styles.date}>{date}</article>
        <article className={styles.title}>{props.title}</article>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button className={styles.button} size="small">
          <a href={props.source} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </Button>
      </CardActions>
    </Card>
  );
};
