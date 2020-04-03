import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';

import { Location, Segment } from '../../../../models/location.models';
import { getLocationsData } from '../../../../services/locations.service';
import styles from './orderLocations.module.scss';

type OrderLocationsProps = {
  resultLocations: (segment: Segment) => void;
};

const OrderLocations = ({ resultLocations }: OrderLocationsProps) => {
  const [locations, setLocations] = useState<Location[] | null>(null);
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);

  useEffect(() => {
    (async () => {
      const locationsData = (await getLocationsData()).data;
      setLocations(locationsData);
    })();
  }, []);

  useEffect(() => {
    if (fromLocation && toLocation) {
      const segment: Segment = {
        from: fromLocation,
        to: toLocation
      };
      resultLocations(segment);
    }
  }, [fromLocation, toLocation]);

  return (
    <form className={styles.locations} noValidate autoComplete="off">
      {!locations ? (
        <Skeleton variant="rect" height={40} />
      ) : (
        <Autocomplete
          id="location_from"
          options={locations}
          getOptionLabel={(option: Location) => option.name}
          renderOption={(option: Location) => option.name}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="From"
              variant="outlined"
              size="small"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password'
              }}
            />
          )}
          onChange={(e: React.ChangeEvent<{}>, value: Location | null) => setFromLocation(value)}
          autoHighlight
          disableClearable
        />
      )}
      {!locations ? (
        <Skeleton variant="rect" height={40} />
      ) : (
        <Autocomplete
          id="location_to"
          options={locations}
          getOptionLabel={(option: Location) => option.name}
          renderOption={(option: Location) => option.name}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="To"
              name="asdasd"
              variant="outlined"
              size="small"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password'
              }}
            />
          )}
          onChange={(e: React.ChangeEvent<{}>, value: Location | null) => setToLocation(value)}
          autoHighlight
          disableClearable
        />
      )}
    </form>
  );
};

export default OrderLocations;