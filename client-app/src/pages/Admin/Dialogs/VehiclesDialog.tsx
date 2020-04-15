import DateFnsUtils from '@date-io/date-fns';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';

import { isOfType, isSomeEnum } from '../../../helpers/typeGuard';
import { Location } from '../../../models/location.models';
import { Vehicle, VehicleType, vehicleTypes } from '../../../models/vehicle.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import styles from './form.module.scss';

export type VehiclesDialogState = {
  destination: Location | null;
  arrivalDate: Date;
  type: VehicleType;
};

export const VehiclesDialog = observer(() => {
  const [vehicle, setVehicle] = useState<VehiclesDialogState>({
    type: VehicleType.Car,
    arrivalDate: new Date(),
    destination: null
  });

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  const handleClose = () => {
    adminStore.dialog.close();
  };

  useEffect(() => {
    (async () => {
      await adminStore.locations.init();
    })();
  }, []);

  const handleSubmit = async () => {
    if (vehicle.destination && isOfType<Vehicle>(vehicle, 'type')) {
      const response = await adminStore.vehicles.add(vehicle);
      appStore.setNotify(response);
      handleClose();
    }
  };

  const handleSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    const checker = isSomeEnum(VehicleType);
    if (checker(value)) {
      setVehicle({...vehicle, type: value});
    }
  };

  const handleDate = (date: MaterialUiPickersDate) => {
    const newDate = date?.getTime();
    if (typeof newDate === 'number') {
      setVehicle({...vehicle, arrivalDate: new Date(newDate) });
    }
  };

  return (
    <>
      <Dialog open={adminStore.dialog.isOpen} onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Vehicles</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <FormControl variant="outlined">
              <InputLabel id="vehicles_label">Vehicle</InputLabel>
              <Select 
                labelId="vehicles_label" 
                labelWidth={55} 
                value={vehicle.type}
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
                value={vehicle.arrivalDate} 
                onChange={handleDate}
              />
            </MuiPickersUtilsProvider>
            <Autocomplete
              options={adminStore.locations.list}
              getOptionLabel={location => location.name}
              renderInput={params => <TextField {...params} label='Destination' variant="outlined" />}
              onChange={(e: any, location: Location | null) =>
                setVehicle({...vehicle, destination: location})}
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