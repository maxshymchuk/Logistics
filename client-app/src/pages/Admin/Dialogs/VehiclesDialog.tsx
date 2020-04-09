import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { isOfType, isSomeEnum } from '../../../helpers/typeGuard';
import { Location } from '../../../models/location.models';
import { MessageType, ServerResponse } from '../../../models/message.models';
import { Vehicle, VehicleType, vehicleTypes } from '../../../models/vehicle.models';
import { getLocationsData } from '../../../services/locations.service';
import { addVehicle } from '../../../services/vehicles.service';
import { AdminContext } from '../../../stores/AdminStore';
import styles from './form.module.scss';

export type VehiclesDialogState = {
  destination: Location | null;
  arrivalDate: Date;
  type: VehicleType;
};

// export type VehiclesDialogProps = {
//   result: (response: ServerResponse<Location[] | null>) => void;
//   onClose: () => void;
// };

export const VehiclesDialog = observer(() => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [state, setState] = useState<VehiclesDialogState>({
    type: VehicleType.Car,
    arrivalDate: new Date(),
    destination: null
  });

  const adminStore = useContext(AdminContext);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    (async () => {
      const locationsResponse = await getLocationsData();
      if (locationsResponse.messageType === MessageType.Error) {
        adminStore.dialogResult = locationsResponse;
        handleClose();
      } else if (locationsResponse.data instanceof Array) {
        setLocations(locationsResponse.data);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (state.destination && isOfType<Vehicle>(state, 'type')) {
      const response = await addVehicle(state);
      result(response);
      handleClose();
    }
  };

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const checker = isSomeEnum(VehicleType);
    if (checker(event.target.value)) {
      setState({...state, type: event.target.value});
    }
  };

  const handleDate = (date: MaterialUiPickersDate) => {
    const newDate = date?.getTime();
    if (typeof newDate === 'number') {
      setState({...state, arrivalDate: new Date(newDate) });
    }
  };

  return (
    <>
      <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Vehicles</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <FormControl variant="outlined">
              <InputLabel id="vehicles_label">Vehicle</InputLabel>
              <Select 
                labelId="vehicles_label" 
                labelWidth={55} 
                value={state.type}
                onChange={handleSelect}
              >
                {vehicleTypes.map((vehicle, index) => (
                  <MenuItem key={index} value={vehicle}>{vehicle}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker 
                ampm={false} 
                label="Arrival Date & Time" 
                inputVariant="outlined" 
                value={state.arrivalDate} 
                onChange={handleDate}
              />
            </MuiPickersUtilsProvider>
            <Autocomplete
              options={locations}
              getOptionLabel={location => location.name}
              renderInput={params => <TextField {...params} label='Destination' variant="outlined" />}
              onChange={(e: any, location: Location | null) =>
                setState({...state, destination: location})}
              disableClearable
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant='contained'>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});