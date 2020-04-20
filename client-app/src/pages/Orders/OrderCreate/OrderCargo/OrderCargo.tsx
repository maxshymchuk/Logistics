import React, { useEffect, useState } from 'react';

import { Button, Paper, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { isOfType } from '../../../../helpers/typeGuard';
import { Cargo, CargoType } from '../../../../models/cargo.models';
import styles from './orderCargo.module.scss';
import OrderCargoItem from './OrderCargoItem/OrderCargoItem';

type OrderCargoProps = {
  list: Cargo[];
  resultCargo: (cargo: Cargo[]) => void;
};

type OrderCargoState = {
  category: CargoType | null,
  description: string | null,
  mass: number | null,
  volume: number | null
};

const defaultCargoState = {
  category: null,
  description: null,
  mass: null,
  volume: null
};

const OrderCargo = ({ list, resultCargo }: OrderCargoProps) => {
  const [cargoList, setCargoList] = useState<Cargo[]>(list);
  const [state, setState] = useState<OrderCargoState>(defaultCargoState);

  useEffect(() => {
    resultCargo(cargoList);
  }, [cargoList]);

  const isValidated = () => {
    if (state.description && state.mass && state.volume && state.category) {
      return (state.volume >= 0 && state.mass > 0);
    }
    return false;
  };

  const addCargo = () => {
    if (isValidated() && isOfType<Cargo>(state, 'category')) {
      setCargoList([ ...cargoList, state]);
      setState(defaultCargoState);
    }
  };

  const deleteCargo = (id: number) => {
    setCargoList((list) => list.filter((el, index) => index !== id ));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <section className={styles.cargo}>
      <Paper className={styles.controls}>
        <TextField
          className={styles.description}
          name="description"
          variant="outlined"
          label="Description"
          size="small"
          value={state.description || ''}
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
            value={state.mass || ''}
            onChange={handleChange}
          />
          <TextField
            className={styles.volume}
            name="volume"
            variant="outlined"
            label="Volume"
            size="small"
            type="number"
            value={state.volume || ''}
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
            value={state.category}
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
      <Paper className={styles.cargo_list}>
        {cargoList.map((cargo, index) => (
          <OrderCargoItem key={index} id={index} cargo={cargo} handleDelete={deleteCargo} />
        ))}
      </Paper>
    </section>
  );
};

export default OrderCargo;