import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';

import { Location } from '../../../models/location.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import styles from './form.module.scss';

const LocationsDialog = observer(() => {
  const [location, setLocation] = useState<Location>({
    name: 'Location',
    coordinates: {
      lat: 0,
      lon: 0
    }
  });

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  const handleClose = () => {
    adminStore.dialog.close();
  };

  const handleSubmit = async () => {
    const response = await adminStore.locations.add(location);
    appStore.setNotify(response);
    handleClose();
  };

  return (
    <>
      <Dialog open={adminStore.dialog.isOpen} onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Locations</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <TextField
              label="Name"
              onChange={e => setLocation({...location, name: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Latitude"
              onChange={e => setLocation({...location, coordinates: {...location.coordinates, lat: +e.target.value}})}
              variant='outlined'
              type='number'
              fullWidth
            />
            <TextField
              label="Longitude"
              onChange={e => setLocation({...location, coordinates: {...location.coordinates, lon: +e.target.value}})}
              variant='outlined'
              type='number'
              fullWidth
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

export default LocationsDialog;