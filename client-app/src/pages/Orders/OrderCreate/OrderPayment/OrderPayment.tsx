import 'react-credit-cards/es/styles-compiled.css';

import React, { useState } from 'react';
import Cards from 'react-credit-cards';

import { TextField } from '@material-ui/core';

import styles from './orderPayment.module.scss';

type OrderPaymentProps = {
  price: number;
}

type OrderPaymentState = {
  cvc: string;
  expiry: string;
  name: string;
  number: string;
};

type FocusType = 'number' | 'name' | 'cvc' | 'expiry' | undefined;

const OrderPayment = ({ price }: OrderPaymentProps) => {
  const [cardInfo, setCardInfo] = useState<OrderPaymentState>({
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
        <article className={styles.title}>
          {price}
        </article>
        <TextField
          className={styles.input}
          name="number"
          label="Card Number"
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          className={styles.input}
          name="name"
          label="Name"
          onChange={handleInputChange}
          fullWidth
        />
        <section className={styles.exp_cvc}>
          <TextField
            className={styles.input}
            name="expiry"
            label="Valid Thru"
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            className={styles.input}
            name="cvc"
            label="CVC"
            onChange={handleInputChange}
            fullWidth
          />
        </section>
      </form>
    </div>
  );
};

export default OrderPayment;