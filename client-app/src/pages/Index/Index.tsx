import { Fab, Fade, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import News from './components/News/News';
import OurServices from './components/OurServices/OurServices';
import Process from './components/Process/Process';
import Sponsors from './components/Sponsors/Sponsors';
import Testimonials from './components/Testimonials/Testimonials';
import Tracker from './components/Tracker/Tracker';
import styles from './index.module.scss';

const Index = () => {
  return (
    <Fade in timeout={2000} unmountOnExit>
      <div className={styles.container}>
        <Header />
        <About />
        <Process />
        <OurServices />
        <Tracker />
        <Testimonials />
        <News />
        <Sponsors />
        <Footer />
        <Fab className={styles.create_order} color="primary">
          <IconButton component={Link} to='/create'>
            <AddIcon />
          </IconButton>
        </Fab>
      </div>
    </Fade>
  );
};

export default Index;