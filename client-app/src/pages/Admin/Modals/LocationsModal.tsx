import cogoToast from 'cogo-toast';
import React, { useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Location } from '../../../models/locations.models';
import { addLocation } from '../../../services/locations.service';
import styles from './form.module.scss';

export type LocationsModalProps = {
  handleModal: (value: boolean) => any;
};

export const LocationsModal = (props: LocationsModalProps) => {
  const [state, setState] = useState<Location>({
    name: 'Location',
    coordinates: {
      lat: 0,
      lon: 0
    }
  });

  const handleClose = () => {
    props.handleModal(false);
  };

  const handleSubmit = async () => {
    const res = await addLocation(state);
    cogoToast.warn(res, {position: 'bottom-right'});
    handleClose();
  };

  return (
    <>
      <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
        <DialogTitle>Locations</DialogTitle>
        <DialogContent>
          <div className={styles.form}>
            <TextField
              label="Name"
              onChange={e => setState({...state, name: e.target.value})}
              variant='outlined'
              fullWidth
            />
            <TextField
              label="Latitude"
              onChange={e => setState({...state, coordinates: {...state.coordinates, lat: +e.target.value}})}
              variant='outlined'
              type='number'
              fullWidth
            />
            <TextField
              label="Longitude"
              onChange={e => setState({...state, coordinates: {...state.coordinates, lon: +e.target.value}})}
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
};