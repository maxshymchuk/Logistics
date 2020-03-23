import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Card, Fade } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Pagination from '@material-ui/lab/Pagination';

import Regenerator from '../Regenerator/Regenerator';
import Shifter from '../Shifter/Shifter';
import styles from './menu.module.scss';

type MenuProps = {
  length: number;
  checkPages: (page: number) => any;
};

const Menu = ({ length, checkPages }: MenuProps) => {
  const [page, setPage] = useState(1);
  const [isShifter, setShifter] = useState(false);
  const [isRegenerator, setRegenerator] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [length]);

  const handleChange = (e: any, pageNumber: number) => {
    setPage(pageNumber);
    checkPages(pageNumber);
  };

  return (
    <>
      {isShifter && <Shifter handleClose={() => setShifter(false)} />}
      {isRegenerator && <Regenerator handleClose={() => setRegenerator(false)} />}
      <AppBar position="static">
        <Toolbar className={styles.wrapper_menu} disableGutters>
          <section className={styles.buttons}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" onClick={() => setShifter(true)}>
              Shifter
            </Button>
            <Button color="inherit" onClick={() => setRegenerator(true)}>
              Regenerator
            </Button>
          </section>
          <Fade in={length !== 0} timeout={200} unmountOnExit>
            <Card className={styles.pagination}>
              <Pagination color='primary' shape="rounded" count={length} page={page} onChange={handleChange} size='small' />
            </Card>
          </Fade>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Menu;