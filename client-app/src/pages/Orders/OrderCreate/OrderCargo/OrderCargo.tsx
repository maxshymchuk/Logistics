import React, { useEffect, useState } from 'react';

import { Button, Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { Cargo, CargoType } from '../../../../models/cargo.models';
import styles from './orderCargo.module.scss';
import OrderCargoItem from './OrderCargoItem/OrderCargoItem';

type OrderCargoProps = {
  resultCargo: (cargo: Cargo[]) => void;
}

type OrderCargoState = {
  category: CargoType | null,
  description: string | null,
  mass: number | null,
  volume: number | null
}

const OrderCargo = ({ resultCargo }: OrderCargoProps) => {
  const [cargoList, setCargoList] = useState<Cargo[]>([]);
  const [state, setState] = useState<OrderCargoState>({
    category: null,
    description: null,
    mass: null,
    volume: null
  });

  useEffect(() => {
    resultCargo(cargoList);
  }, [cargoList])

  const addCargo = () => {
    if (isValidated()) {
      setCargoList([ ...cargoList, state as Cargo ]);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }

  const isValidated = () => {
    if (!!(state.description && state.mass && state.volume && state.category)) {
      if (state.volume < 0 || state.mass < 0) return false;
      return true;
    }
    return false;
  }

  return (
    <div className={styles.cargo}>
      <Paper className={styles.controls}>
        <TextField
          className={styles.description}
          name="description"
          variant="outlined"
          label="Description"
          size="small"
          onChange={handleChange}
        />
        <div className={styles.additional}>
          <TextField
            className={styles.mass}
            name="mass"
            variant="outlined"
            label="Mass"
            size="small"
            type="number"
            onChange={handleChange}
          />
          <TextField
            className={styles.volume}
            name="volume"
            variant="outlined"
            label="Volume"
            size="small"
            type="number"
            onChange={handleChange}
          />
          <Autocomplete
            className={styles.category}
            options={Object.values(CargoType)}
            getOptionLabel={(option: CargoType) => option}
            renderOption={(option: CargoType) => option}
            renderInput={(params: any) => (
              <TextField
                {...params}
                label="Type"
                variant="outlined"
                size="small"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password'
                }}
              />
            )}
            onChange={(e: React.ChangeEvent<{}>, category: CargoType | null) => category && setState({ ...state, category })}
            autoHighlight
            disableClearable
          />
        </div>
        <Button
          className={styles.button}
          color="primary"
          variant='outlined'
          onClick={addCargo}
          disabled={!isValidated()}
          fullWidth
        >
          Add
        </Button>
      </Paper>
      <Paper>
        {cargoList.map((cargo, index) => (
          <OrderCargoItem key={index} {...cargo} />
        ))}
      </Paper>
    </div>
  );
};

export default OrderCargo;