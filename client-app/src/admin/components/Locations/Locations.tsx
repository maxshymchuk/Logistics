import React, { useContext, useEffect, useState } from 'react';

import {
    CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Notification from '../../../components/Notification/Notification';
import { AdminContext } from '../../../contexts/AdminContext';
import { Location } from '../../../models/location.models';
import { Message } from '../../../models/message.models';
import { getLocationsData, removeLocationById } from '../../../services/locations.service';
import tableStyles from '../../styles/table.module.scss';

type LocationsState = {
  locations: Location[]; 
  isLoaded: boolean;
};

type LocationsProps = {
  page: number;
  checkPages: (length: number) => any
};

const Locations = ({ page, checkPages }: LocationsProps) => {
  const ITEMS_ON_PAGE = 20;

  const [notifyMessage, setNotifyMessage] = useState<Message<string> | null>(null);
  const [isChanged, setChanged] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [state, setState] = useState<LocationsState>({
    locations: [],
    isLoaded: false
  });

  const context = useContext(AdminContext);

  useEffect(() => {
    (async () => {
      const locationsData = (await getLocationsData()).data;
      setState({ ...state, locations: locationsData, isLoaded: true });
      setPagesNumber(Math.round(locationsData.length / ITEMS_ON_PAGE));
    })();
  }, [isChanged, context.isChanged]);

  useEffect(() => {
    checkPages(pagesNumber);
  }, [pagesNumber]);

  const removeLocation = async (location: Location) => {
    if (location._id) {
      const message = await removeLocationById(location._id);
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
                  <TableCell>Location</TableCell>
                  <TableCell align="right">Coordinates (lat, lon)</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.locations.slice((page - 1) * ITEMS_ON_PAGE, page * ITEMS_ON_PAGE).map((location, index) => (
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
              <span>{`${state.locations.length} location(s)`}</span>
            </section>
          </TableContainer>
        </Fade>
      )}
    </>
  );
};

export default Locations;