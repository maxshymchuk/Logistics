import React from 'react';

import {
  Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Route } from '../../../../models/routes.models';
import tableStyles from '../../../styles/table.module.scss';

type RoutesModalProps = {
  routes: Route[];
  handleModal: () => void;
};

const RoutesModal = ({ routes, handleModal }: RoutesModalProps) => {
  const handleClose = () => {
    handleModal();
  };

  return (
    <Dialog open onClose={handleClose} scroll='body' maxWidth='sm' fullWidth>
      <DialogTitle>Routes</DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">To</TableCell>
                <TableCell align="right" className={tableStyles.nowrap}>Departure Date</TableCell>
                <TableCell align="right">Vehicle</TableCell>
                <TableCell align="right">Cargos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {routes.map((route, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell align="right">{route.startLocation.name}</TableCell>
                  <TableCell align="right">{route.endLocation.name}</TableCell>
                  <TableCell align="right">{new Date(route.departureDate).toLocaleString()}</TableCell>
                  <TableCell align="right">{route.vehicle.type}</TableCell>
                  <TableCell align="right">{route.cargos.join(', ')}</TableCell>
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

export default RoutesModal;