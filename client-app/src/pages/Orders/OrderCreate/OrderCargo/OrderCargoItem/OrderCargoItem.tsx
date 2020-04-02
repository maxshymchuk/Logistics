import React from 'react';

import { Fade } from '@material-ui/core';

import { Cargo } from '../../../../../models/cargo.models';
import styles from './orderCargoItem.module.scss';

const OrderCargoItem = ({ description, category, mass, volume }: Cargo) => {
  return (
    <Fade in={true}>
      <section className={styles.order_item}>
        <div className={styles.description_group}>
          <div className={styles[category]} title={category}></div>
          <span className={styles.description} title={description}>{description}</span>
        </div>
        <div className={styles.mass} title='Mass'>{mass}</div>
        <div className={styles.volume} title='Volume'>{volume}</div>
      </section>
    </Fade>
  );
};

export default OrderCargoItem;