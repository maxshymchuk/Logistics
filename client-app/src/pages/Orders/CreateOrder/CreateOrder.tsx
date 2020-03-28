import React, { useEffect, useState } from 'react';

import { Button, Card, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { Location } from '../../../models/location.models';
import { OrderUser } from '../../../models/order.models';
import { UserPath } from '../../../models/path.models';
import { getLocationsData } from '../../../services/locations.service';
import { createOrder } from '../../../services/orders.service';
import styles from './createOrder.module.scss';
import OrderComplete from './OrderComplete/OrderComplete';
import OrderPathsList from './OrderPathsList/OrderPathsList';

const CreateOrder = () => {
  const [order, setOrder] = useState<OrderUser>({
    from: '',
    to: '',
    cargos: [],
    message: ''
  });
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [trackNumber, setTrackNumber] = useState('');
  const [errors, setErrors] = useState({
    from: false,
    to: false
  });

  const [isRoutesShown, setRoutesShown] = useState(false);
  const [isOrderTaken, setOrderTaken] = useState(false);

  useEffect(() => {
    (async () => {
      const locationsData = (await getLocationsData()).data;
      setLocations(locationsData);
    })();
  }, []);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const property = event.target.name;
    setOrder({ ...order, [property]: value });
    setRoutesShown(false);
  };

  const handleAutocomplete = (event: any, value: Location | null, str: string) => {
    if (value) {
      setOrder({ ...order, [str]: value.name });
      setErrors({ ...errors, [str]: false });
      setRoutesShown(false);
    }
  };

  const showRoutes = () => {
    setErrors({
      from: !order.from,
      to: !order.to
    });
    setRoutesShown(!!order.from && !!order.to);
  };

  const takeOrder = async (path: UserPath) => {
    const message = await createOrder(path);
    setTrackNumber(message.data);
    setOrderTaken(true);
  };

  const resetOrder = () => {
    setOrderTaken(false);
    setRoutesShown(false);
  };

  return (
    <>
      {!isOrderTaken ? (
        <Card className={styles.order}>
          <form noValidate autoComplete="off">
            <section className={styles.form}>
              <article className={styles.title}>Create order</article>
              <section className={styles.inputs}>
                {!locations ? (
                  <Skeleton variant="rect" height={60} />
                ) : (
                  <Autocomplete
                    id="location_from"
                    options={locations}
                    getOptionLabel={(option: Location) => option.name}
                    renderOption={(option: Location) => option.name}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Choose from location"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password'
                        }}
                      />
                    )}
                    onChange={(e: any, v: Location | null) => handleAutocomplete(e, v, 'from')}
                    autoHighlight
                    disableClearable
                  />
                )}
                {!locations ? (
                  <Skeleton variant="rect" height={60} />
                ) : (
                  <Autocomplete
                    id="location_to"
                    options={locations}
                    getOptionLabel={(option: Location) => option.name}
                    renderOption={(option: Location) => option.name}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="Choose to location"
                        name="asdasd"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password'
                        }}
                      />
                    )}
                    onChange={(e: any, v: Location | null) => handleAutocomplete(e, v, 'to')}
                    autoHighlight
                    disableClearable
                  />
                )}
              </section>
              {!locations ? (
                <Skeleton variant="rect" height={60} />
              ) : (
                <TextField
                  name="cargos"
                  label="Cargos"
                  variant="outlined"
                  onChange={handleInput}
                  fullWidth
                />
              )}
              {!locations ? (
                <Skeleton variant="rect" height={60} />
              ) : (
                <TextField
                  name="message"
                  label="Message"
                  variant="outlined"
                  onChange={handleInput}
                  multiline
                  fullWidth
                />
              )}
              {isRoutesShown ? (
                <div className={styles.list}>
                  <article className={styles.title}>
                    Choose a suitable route
                  </article>
                  <OrderPathsList
                    order={order as OrderUser}
                    callback={takeOrder}
                  />
                </div>
              ) : (
                <div className={styles['button-check']}>
                  {!errors.from && !errors.to ? (
                    <Button
                      variant="outlined"
                      color="primary" 
                      onClick={showRoutes}
                      disabled={!locations}
                      fullWidth
                    >
                      Show possible routes
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={showRoutes}
                      fullWidth
                    >
                      Choose from and to locations
                    </Button>
                  )}
                </div>
              )}
            </section>
          </form>
        </Card>
      ) : (
        <OrderComplete trackNumber={trackNumber} createNewOrder={resetOrder} />
      )}
    </>
  );
};

export default CreateOrder;