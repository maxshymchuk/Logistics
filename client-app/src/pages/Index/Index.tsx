import React from 'react';

import Tracker from './components/Tracker/Tracker';
import About from './components/About/About';
import Sponsors from './components/Sponsors/Sponsors';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import News from './components/News/News';
import OurServices from './components/OurServices/OurServices';
import Process from './components/Process/Process';
import Testimonials from './components/Testimonials/Testimonials';

const Index = () => {
  return (
    <>
      <Header />
      <About />
      <Process />
      <OurServices />
      <Tracker />
      <Testimonials />
      <Sponsors />
      <News />
      <Footer />
    </>
  );
};

export default Index;