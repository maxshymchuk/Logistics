import React from 'react';

import About from '../../components/About/About';
import Differencies from '../../components/Differencies/differencies';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import News from '../../components/News/News';
import OurServices from '../../components/OurServices/OurServices';
import Process from '../../components/Process/Process';
import Testimonials from '../../components/Testimonials/Testimonials';
import Tracker from '../../components/Tracker/Tracker';

const Index = () => {
  return (
    <>
      <Header />
      <About />
      <Process />
      <OurServices />
      <Tracker />
      <Differencies />
      <Testimonials />
      <News />
      <Footer />
    </>
  );
};

export default Index;