import React from "react";

import { About } from "../../components/About/About";
import { Differencies } from "../../components/Differencies/differencies";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { News } from "../../components/News/News";
import { Process } from "../../components/Process/Process";
import { Service } from "../../components/Service/Service";
import { Testimonials } from "../../components/Testimonials/Testimonials";
import { Tracker } from "../../components/Tracker/Tracker";

export const Home = () => {
  return (
    <>
      <Header />
      <About />
      <Process />
      <Service />
      <Tracker />
      <Differencies />
      <Testimonials />
      <News />
      <Footer />
    </>
  );
};
