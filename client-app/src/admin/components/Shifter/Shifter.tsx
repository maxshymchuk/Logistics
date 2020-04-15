import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import changeTime from '../../services/shifter.service';
import styles from './shifter.module.scss';

type ShifterProps = {
  handleClose: () => void;
};

const Shifter = (props: ShifterProps) => {
  const [isLoading, setLoading] = useState(false);
  const [value, setValue] = useState(1);

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  const handleChange = async () => {
    setLoading(true);
    const result = await changeTime(value);
    await adminStore.vehicles.update();
    await adminStore.orders.update();
    appStore.setNotify(result);
    setLoading(false);
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog open onClose={handleClose} scroll='body' maxWidth='xs' fullWidth>
      <DialogTitle>Time Shifter</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the number of days (24 hours) to move the calendar in the direction of the number sign
        </DialogContentText>
        <TextField
          size="small"
          className={styles.days}
          type="number"
          value={value}
          onChange={e => setValue(+e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleChange} color="primary" variant='contained'>
          {isLoading && <CircularProgress className={styles.progress} color='inherit' size={20} />}
          Shift
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Shifter;