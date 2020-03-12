import "@brainhubeu/react-carousel/lib/style.css";

import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";

import Carousel from "@brainhubeu/react-carousel";
import { Card } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import female1 from "../../assets/testimonials/female1.jpg";
import female2 from "../../assets/testimonials/female2.jpg";
import female3 from "../../assets/testimonials/female3.jpg";
import female4 from "../../assets/testimonials/female4.jpg";
import male1 from "../../assets/testimonials/male1.jpg";
import male2 from "../../assets/testimonials/male2.jpg";
import male3 from "../../assets/testimonials/male3.jpg";
import { ReviewItem } from "./ReviewItem/ReviewItem";
import styles from "./testimonials.module.scss";

const reviewers = [male1, female1, female2, male2, female3, male3, female4];
const reviews = [
  {
    text: "Review 1",
    date: new Date()
  },
  {
    text: "Review 2",
    date: new Date()
  },
  {
    text: "Review 3",
    date: new Date()
  },
  {
    text: "Review 4",
    date: new Date()
  },
  {
    text: "Review 5",
    date: new Date()
  },
  {
    text: "Review 6",
    date: new Date()
  },
  {
    text: "Review 7",
    date: new Date()
  }
];

export const Testimonials = () => {
  return (
    <ScrollableAnchor id="reviews">
      <div className={styles.testimonials}>
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
    </ScrollableAnchor>
  );
};
