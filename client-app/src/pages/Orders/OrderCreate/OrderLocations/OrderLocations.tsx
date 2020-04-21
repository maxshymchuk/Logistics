import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Skeleton from '@material-ui/lab/Skeleton';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';

import { Location, Segment } from '../../../../models/location.models';
import { MessageType } from '../../../../models/message.models';
import { AdminContext } from '../../../../stores/Admin/AdminStore';
import { AppContext } from '../../../../stores/AppStore';
import styles from './orderLocations.module.scss';

type OrderLocationsProps = {
  resultLocations: (segment: Segment | null) => void;
};

const OrderLocations = observer(({ resultLocations }: OrderLocationsProps) => {
  const [fromLocation, setFromLocation] = useState<Location | null>(null);
  const [toLocation, setToLocation] = useState<Location | null>(null);

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const response = await adminStore.locations.init();
      if (response.messageType === MessageType.Error) {
        appStore.setNotify(response);
      }
    })();
  }, []);

  useEffect(() => {
    if (fromLocation && toLocation) {
      const segment: Segment = {
        from: fromLocation,
        to: toLocation
      };
      if (fromLocation === toLocation) {
        resultLocations(null);
      } else {
        resultLocations(segment);
      }
    }
  }, [fromLocation, toLocation]);

  return (
    <form className={styles.locations} noValidate autoComplete="off">
      {!adminStore.locations.isLoaded ? (
        <Skeleton variant="rect" height={40} />
      ) : (
        <Autocomplete
          id="location_from"
          options={adminStore.locations.list}
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
      {!adminStore.locations.isLoaded ? (
        <Skeleton variant="rect" height={40} />
      ) : (
        <Autocomplete
          id="location_to"
          options={adminStore.locations.list}
          getOptionLabel={(option: Location) => option.name}
          renderOption={(option: Location) => option.name}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="To"
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
});

export default OrderLocations;