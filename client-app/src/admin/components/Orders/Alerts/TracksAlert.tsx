import React from 'react';

import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Track } from '../../../../models/track.models';
import tableStyles from '../../../styles/table.module.scss';

type TracksAlertProps = {
  tracks: Track[];
  onClose: () => void;
};

const TracksAlert = ({ tracks, onClose }: TracksAlertProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
      <DialogTitle>Tracks</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Departure Date</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Arrival Date</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((track, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">{new Date(track.departureDate).toLocaleString()}</TableCell>
                  <TableCell align="right">{new Date(track.arrivalDate).toLocaleString()}</TableCell>
                  <TableCell align="right">{track.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TracksAlert;