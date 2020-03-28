import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import { Location } from '../../../models/location.models';
import { Message } from '../../../models/message.models';
import { Vehicle, VehicleType } from '../../../models/vehicle.models';
import { getLocationsData } from '../../../services/locations.service';
import { addVehicle } from '../../../services/vehicles.service';
import styles from './form.module.scss';

export type VehiclesDialogState = {
  destination: Location | null;
  arrivalDate: Date;
  type: VehicleType;
};

export type VehiclesDialogProps = {
  result: (message: Message<string>) => void;
  onClose: () => void;
};

export const VehiclesDialog = ({result, onClose}: VehiclesDialogProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [state, setState] = useState<VehiclesDialogState>({
    type: VehicleType.Car,
    arrivalDate: new Date(),
    destination: null
  });

  useEffect(() => {
    (async () => {
      const locationsData = (await getLocationsData()).data;
      setLocations(locationsData);
    })();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    if (state.destination) {
      const message = await addVehicle(state as Vehicle);
      result(message);
      handleClose();
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
                onChange={e => setState({...state, type: e.target.value as VehicleType})}
              >
                {Object.keys(VehicleType).map((vehicle, index) => (
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
                onChange={date => setState({...state, arrivalDate: date as Date})}
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
};