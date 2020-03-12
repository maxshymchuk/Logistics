import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

import { TimeChanger } from "../TimeChanger/TimeChanger";
import styles from "./menu.module.scss";

export const Menu = () => {
  return (
    <AppBar position="static">
      <Toolbar className={styles.wrapper_menu}>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <TimeChanger />
      </Toolbar>
    </AppBar>
  );
};
