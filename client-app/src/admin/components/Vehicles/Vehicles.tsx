import React, { useContext, useEffect, useState } from 'react';

import {
  CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Notification from '../../../components/Notification/Notification';
import { AdminContext } from '../../../contexts/AdminContext';
import { Message } from '../../../models/message.models';
import { Vehicle, VehicleType } from '../../../models/vehicle.models';
import { getVehiclesData, removeVehicleById } from '../../../services/vehicles.service';
import tableStyles from '../../styles/table.module.scss';
import styles from './vehicles.module.scss';

type VehiclesState = {
  vehicles: Vehicle[]; 
  isLoaded: boolean;
};

type VehiclesProps = {
  page: number;
  checkPages: (length: number) => any
};

const Vehicles = ({ page, checkPages }: VehiclesProps) => {
  const ITEMS_ON_PAGE = 20;

  const [notifyMessage, setNotifyMessage] = useState<Message<string> | null>(null);
  const [isChanged, setChanged] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [state, setState] = useState<VehiclesState>({
    vehicles: [],
    isLoaded: false
  });

  const { isChanged: isChangedContext } = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const vehiclesData = (await getVehiclesData()).data;
      setState({ ...state, vehicles: vehiclesData, isLoaded: true });
      setPagesNumber(Math.round(vehiclesData.length / ITEMS_ON_PAGE));
    })();
  }, [isChanged, isChangedContext]);

  useEffect(() => {
    checkPages(pagesNumber);
  }, [pagesNumber]);

  const removeVehicle = async (vehicle: Vehicle) => {
    if (vehicle._id) {
      const message = await removeVehicleById(vehicle._id);
      setNotifyMessage(message);
      setChanged(!isChanged);
    }
  };

  return (
    <>
      {notifyMessage && <Notification {...notifyMessage} afterClose={() => setNotifyMessage(null)} />}
      {!state.isLoaded ? (
        <CircularProgress />
      ) : (
        <Fade in={state.isLoaded} timeout={200} unmountOnExit>
          <TableContainer component={Paper} className={tableStyles.table}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle</TableCell>
                  <TableCell align="right">Arrival Date</TableCell>
                  <TableCell align="right">Destination</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.vehicles.slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE).map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      <section className={styles.vehicle}>
                        <div className={styles[vehicle.type]} />
                        {vehicle.type}
                      </section>
                    </TableCell>
                    <TableCell align="right">
                      {new Date(vehicle.arrivalDate).toLocaleString()}
                    </TableCell>
                    <TableCell align="right"> 
                      {vehicle.destination.name}
                    </TableCell>
                    <TableCell align="right" padding='none'> 
                      <IconButton size='small' onClick={() => removeVehicle(vehicle)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className={tableStyles.total}>
              <span>{`${state.vehicles.length} vehicle(s)`}</span>
              <span>{`${state.vehicles.filter(vehicle => vehicle.type === VehicleType.Plane).length} plane(s)`}</span>
              <span>{`${state.vehicles.filter(vehicle => vehicle.type === VehicleType.Car).length} car(s)`}</span>
              <span>{`${state.vehicles.filter(vehicle => vehicle.type === VehicleType.Ship).length} ship(s)`}</span>
              <span>{`${state.vehicles.filter(vehicle => vehicle.type === VehicleType.Train).length} train(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
};

export default Vehicles;