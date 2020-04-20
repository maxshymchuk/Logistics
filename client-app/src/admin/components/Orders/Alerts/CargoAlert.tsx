import React from 'react';

import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Cargo } from '../../../../models/cargo.models';

import tableStyles from '../../../styles/table.module.scss';

type CargoAlertProps = {
  cargo: Cargo[];
  onClose: () => void;
};

const CargoAlert = ({ cargo: cargoList, onClose }: CargoAlertProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
      <DialogTitle>Cargo</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Mass (kg)</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Volume (m3)</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cargoList.map((cargo, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">{cargo.description}</TableCell>
                  <TableCell align="right">{cargo.mass}</TableCell>
                  <TableCell align="right">{cargo.volume}</TableCell>
                  <TableCell align="right">{cargo.category}</TableCell>
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

export default CargoAlert;