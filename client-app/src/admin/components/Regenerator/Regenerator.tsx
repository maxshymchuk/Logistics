import React, { useState } from 'react';

import {
    Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';

import Notification from '../../../components/Notification/Notification';
import { ServerResponse } from '../../../models/message.models';
import { regenLocations, regenVehicles } from '../../services/regenerator.service';
import styles from './regenerator.module.scss';

type RegeneratorProps = {
  handleClose: () => void;
};

const Regenerator = (props: RegeneratorProps) => {
  const [dialogResult, setDialogResult] = useState<ServerResponse | null>(null);
  const [isLoading, setLoading] = useState({
    locations: false,
    vehicles: false
  });

  const regenerateLocations = async () => {
    setLoading({...isLoading, locations: true});
    const result = await regenLocations();
    setDialogResult(result);
    setLoading({...isLoading, locations: false});
  };

  const regenerateVehicles = async () => {
    setLoading({...isLoading, vehicles: true});
    const result = await regenVehicles();
    setDialogResult(result);
    setLoading({...isLoading, vehicles: false});
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog open onClose={handleClose} scroll='body' maxWidth='xs' fullWidth>
      {dialogResult && <Notification {...dialogResult} afterClose={() => setDialogResult(null)} />}
      <DialogTitle>Regenerator</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Locations: rewrites locations and maps from server workpiece to database
        </DialogContentText>
        <DialogContentText>
          Vehicles: creates 1000 random vehicles from the current date to 1 year after
        </DialogContentText>
        <section className={styles.buttons}>
          <Button onClick={regenerateLocations} color="primary" variant='contained'>
            {isLoading.locations ? <CircularProgress color='inherit' size={20} /> : <ReplayIcon />}
            <span className={styles.name}>Locations</span>
          </Button>
          <Button onClick={regenerateVehicles} color="primary" variant='contained'>
            {isLoading.vehicles ? <CircularProgress color='inherit' size={20} /> : <ReplayIcon />}
            <span className={styles.name}>Vehicles</span>
          </Button>
        </section>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Regenerator;