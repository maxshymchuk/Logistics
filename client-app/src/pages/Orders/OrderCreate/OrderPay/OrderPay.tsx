import 'react-credit-cards/es/styles-compiled.css';

import React, { useState } from 'react';
import Cards from 'react-credit-cards';

import { TextField } from '@material-ui/core';

import styles from './orderPayment.module.scss';

type OrderPayState = {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
};

type FocusType = 'number' | 'name' | 'cvc' | 'expiry' | undefined;

const OrderPay = () => {
  const [cardInfo, setCardInfo] = useState<OrderPayState>({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
  });
  const [focus, setFocus] = useState<FocusType>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFocus(name as FocusType);
    setCardInfo({ ...cardInfo, [name]: value });
  };

  return (
    <div className={styles.payment}>
      <div className={styles.payment_card}>
        <Cards
          cvc={cardInfo.cvc}
          expiry={cardInfo.expiry}
          focused={focus}
          name={cardInfo.name}
          number={cardInfo.number}
        />
      </div>
      <form className={styles.form} noValidate autoComplete='off'>
        <TextField
          className={styles.input}
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          className={styles.input}
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          fullWidth
        />
        <section className={styles.exp_cvc}>
          <TextField
            className={styles.input}
            name="expiry"
            placeholder="Valid Thru"
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            className={styles.input}
            name="cvc"
            placeholder="CVC"
            onChange={handleInputChange}
            fullWidth
          />
        </section>
      </form>
    </div>
  );
};

export default OrderPay;