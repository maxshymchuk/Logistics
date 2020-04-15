import { Card, Fade } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Pagination from '@material-ui/lab/Pagination';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../../../stores/Admin/AdminStore';

import Regenerator from '../Regenerator/Regenerator';
import Shifter from '../Shifter/Shifter';
import styles from './menu.module.scss';

const Menu = observer(() => {
  const [isShifter, setShifter] = useState(false);
  const [isRegenerator, setRegenerator] = useState(false);

  const adminStore = useContext(AdminContext);

  const handleChange = (e: any, page: number) => {
    adminStore.content.setPage(page);
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
          <Fade in timeout={200} unmountOnExit>
            <Card className={styles.pagination}>
              <Pagination
                color='primary'
                shape="rounded"
                count={adminStore.content.pageNumber}
                page={adminStore.content.currentPage}
                onChange={handleChange}
                size='small'
              />
            </Card>
          </Fade>
        </Toolbar>
      </AppBar>
    </>
  );
});

export default Menu;