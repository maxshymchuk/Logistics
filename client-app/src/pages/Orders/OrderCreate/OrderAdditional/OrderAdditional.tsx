import 'react-credit-cards/es/styles-compiled.css';

import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';

import styles from './orderAdditional.module.scss';

type OrderAdditionalProps = {
  message: string;
  resultMessage: (message: string) => void;
}

const OrderAdditional = ({ message, resultMessage }: OrderAdditionalProps) => {
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    setMessageText(message);
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value);
    resultMessage(messageText);
  }

  return (
    <div className={styles.additional}>
      <TextField
        className={styles.message}
        name="message"
        variant="outlined"
        label="Message"
        size="small"
        type="number"
        value={messageText}
        onChange={handleChange}
        multiline
        fullWidth
      />
    </div>
  );
};

export default OrderAdditional;