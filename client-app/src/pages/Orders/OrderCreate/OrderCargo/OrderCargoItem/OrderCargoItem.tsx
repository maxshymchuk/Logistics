import React from 'react';

import { Fade, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Cargo } from '../../../../../models/cargo.models';
import styles from './orderCargoItem.module.scss';

type OrderCargoItemProps = {
  id: number;
  cargo: Cargo;
  handleDelete?: (id: number) => void;
};

const OrderCargoItem = ({ id, cargo, handleDelete }: OrderCargoItemProps) => {
  const { description, mass, volume, category } = cargo;

  return (
    <Fade in>
      <section className={styles.order_item}>
        <div className={styles.description_group}>
          <div className={styles[category]} title={category} />
          <span className={styles.description} title={description}>{description}</span>
        </div>
        <div className={styles.mass} title='Mass'>{mass}</div>
        <div className={styles.volume} title='Volume'>{volume}</div>
        {handleDelete && (
          <IconButton color="secondary" size="small" onClick={() => handleDelete(id)}>
            <CloseIcon />
          </IconButton>
        )}
      </section>
    </Fade>
  );
};

export default OrderCargoItem;