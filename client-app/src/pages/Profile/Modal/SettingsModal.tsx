import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';

import DateFnsUtils from '@date-io/date-fns';
import {
  Button, FormControl, InputLabel, MenuItem, Select, TextField,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import styles from './form.module.scss';

export type SettingsModalState = {};

export type SettingsModalProps = {
  handleModal: (value: boolean) => any;
};

export const SettingsModal = (props: SettingsModalProps) => {
  useEffect(() => {}, []);

  const handleClose = () => {
    props.handleModal(false);
  };

  const handleUpdate = async () => {
    handleClose();
  };

  return (
    <Dialog open onClose={handleClose} scroll="body" maxWidth="sm" fullWidth>
      <DialogTitle>Vehicles</DialogTitle>
      <DialogContent>
        <div className={styles.form} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
