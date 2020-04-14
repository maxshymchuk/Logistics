import {
  CircularProgress,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { observer } from 'mobx-react';
import React, { useContext, useEffect } from 'react';

import { MessageType } from '../../../models/message.models';
import { Vehicle, VehicleType } from '../../../models/vehicle.models';
import { getVehiclesData, removeVehicleById } from '../../../services/vehicles.service';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import tableStyles from '../../styles/table.module.scss';
import styles from './vehicles.module.scss';

const Vehicles = observer(() => {

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  useEffect(() => {
    if (!adminStore.content.vehicles.length) {
      (async () => {
        const response = await getVehiclesData();
        if (response.messageType === MessageType.Error) {
          appStore.setNotify(response);
        } else if (response.data instanceof Array) {
          adminStore.content.update(response.data);
        }
      })();
    }
  }, []);

  const removeVehicle = async (vehicle: Vehicle) => {
    if (vehicle._id) {
      const response = await removeVehicleById(vehicle._id);
      adminStore.content.remove(vehicle._id);
      appStore.setNotify(response);
    }
  };

  const getVehiclesByType = (type: VehicleType) => {
    return adminStore.content.vehicles.filter(vehicle => vehicle.type === type);
  };

  return (
    <>
      {!adminStore.content.vehicles ? (
        <CircularProgress />
      ) : (
        <Fade in timeout={200} unmountOnExit>
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
                {adminStore.content.page?.map((vehicle, index) => (
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
              <span>{`${adminStore.content.vehicles.length} vehicle(s)`}</span>
              <span>{`${getVehiclesByType(VehicleType.Plane)?.length} plane(s)`}</span>
              <span>{`${getVehiclesByType(VehicleType.Car)?.length} car(s)`}</span>
              <span>{`${getVehiclesByType(VehicleType.Ship)?.length} ship(s)`}</span>
              <span>{`${getVehiclesByType(VehicleType.Train)?.length} train(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
});

export default Vehicles;