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
import { Location } from '../../../models/location.models';
import { MessageType } from '../../../models/message.models';
import { AdminContext } from '../../../stores/Admin/AdminStore';
import { AppContext } from '../../../stores/AppStore';
import tableStyles from '../../styles/table.module.scss';

const Locations = observer(() => {

  const appStore = useContext(AppContext);
  const adminStore = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const response = await adminStore.locations.init();
      if (response.messageType === MessageType.Error) {
        appStore.setNotify(response);
      }
    })();
  }, []);

  const removeLocation = async (location: Location) => {
    if (location._id) {
      const response = await adminStore.locations.remove(location._id);
      appStore.setNotify(response);
    }
  };

  return (
    <>
      {!adminStore.locations.isLoaded ? (
        <CircularProgress />
      ) : (
        <Fade in timeout={200} unmountOnExit>
          <TableContainer component={Paper} className={tableStyles.table}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">Coordinates (lat, lon)</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {adminStore.locations.page.map((location, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {location.name}
                    </TableCell>
                    <TableCell align="right">
                      {`${location.coordinates.lat}, ${location.coordinates.lon}`}
                    </TableCell>
                    <TableCell align="right" padding='none'> 
                      <IconButton size='small' onClick={() => removeLocation(location)}>
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <section className={tableStyles.total}>
              <span>{`${adminStore.locations.list.length} location(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
});

export default Locations;