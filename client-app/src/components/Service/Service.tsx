import React from "react";
import { Link } from "react-router-dom";
import ScrollableAnchor from "react-scrollable-anchor";

import { Button } from "@material-ui/core";

import styles from "./service.module.scss";

// TODO: unclear naming
export const Service = () => {
  return (
    <ScrollableAnchor id="service">
      <div className={styles.service}>
        <section className={styles.wrapper_service}>
          <h1 className={styles.title}>Create Order Right Now</h1>
          <div className={styles.content}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              component={Link}
              to="/create"
            >
              Create order
            </Button>
          </div>
        </section>
      </div>
    </ScrollableAnchor>
  );
};
