import "@brainhubeu/react-carousel/lib/style.css";

import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";

import Carousel from "@brainhubeu/react-carousel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import newsImage1 from "../../assets/news/1.jpg";
import newsImage2 from "../../assets/news/2.jpg";
import newsImage3 from "../../assets/news/3.jpg";
import newsImage4 from "../../assets/news/4.jpg";
import styles from "./news.module.scss";
import { NewsItem } from "./NewsItem/NewsItem";

const news = [
  {
    date: new Date(2020, 2, 6),
    image: newsImage1,
    title:
      "Logistics Manager Analysis: Safety first… the future of commercial vehicles",
    source:
      "https://www.logisticsmanager.com/logistics-manager-analysis-safety-first-the-future-of-commercial-vehicles"
  },
  {
    date: new Date(2020, 2, 5),
    image: newsImage2,
    title: `Coronavirus fallout pounds Chicago's logistics industry`,
    source:
      "https://www.chicagobusiness.com/logistics/coronavirus-fallout-pounds-chicagos-logistics-industry"
  },
  {
    date: new Date(2020, 2, 4),
    image: newsImage3,
    title: "ŠKODA’s logistics department is facing a planned generation change",
    source:
      "https://www.eurologport.eu/skodas-logistics-department-is-facing-a-planned-generation-change"
  },
  {
    date: new Date(2020, 2, 2),
    image: newsImage4,
    title: "Airbus’ new weight variant A330neo makes its first flight",
    source:
      "https://www.eurologport.eu/airbus-new-weight-variant-a330neo-makes-its-first-flight"
  }
];

export const News = () => {
  return (
    <ScrollableAnchor id="news">
      <div className={styles.news}>
        <section className={styles.wrapper_news}>
          <h1 className={styles.title}>Latest News For You</h1>
          <article className={styles.subtitle}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </article>
          <div className={styles.content}>
            <Carousel
              slidesPerPage={3}
              arrowLeft={<ArrowBackIcon className={styles.arrow} />}
              arrowRight={<ArrowForwardIcon className={styles.arrow} />}
              autoPlay={8000}
              animationSpeed={2000}
              breakpoints={{
                600: {
                  slidesPerPage: 2
                },
                500: {
                  slidesPerPage: 1
                }
              }}
              addArrowClickHandler
              stopAutoPlayOnHover
              arrows
              infinite
            >
              {news.map((news, index) => (
                <NewsItem key={index} {...news} />
              ))}
            </Carousel>
          </div>
        </section>
      </div>
    </ScrollableAnchor>
  );
};
