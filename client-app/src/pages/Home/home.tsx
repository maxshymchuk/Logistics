import React from 'react';
import { Header } from '../../components/Header/Header';
import { About } from '../../components/About/About';
import { Process } from '../../components/Process/Process';
import { Service } from '../../components/Service/Service';
import { Tracker } from '../../components/Tracker/Tracker';
import { Differencies } from '../../components/Differencies/differencies';
import { Testimonials } from '../../components/Testimonials/Testimonials';
import { News } from '../../components/News/News';
import { Footer } from '../../components/Footer/Footer';

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
