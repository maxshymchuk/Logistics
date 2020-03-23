import cogoToast from 'cogo-toast';
import React, { useContext, useEffect, useState } from 'react';

import {
  CircularProgress, Fade, IconButton, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { Location } from '../../../models/locations.models';
import { AdminContext } from '../../../pages/Admin/Admin';
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

  const [changes, setChanges] = useState(false);
  const [pagesNumber, setPagesNumber] = useState(0);
  const [state, setState] = useState<LocationsState>({
    locations: [],
    isLoaded: false
  });

  const context = useContext<boolean>(AdminContext);

  useEffect(() => {
    (async () => {
      const locations = await getLocationsData();
      setState({ ...state, locations, isLoaded: true });
      setPagesNumber(Math.round(locations.length / ITEMS_ON_PAGE));
    })();
  }, [changes, context]);

  useEffect(() => {
    checkPages(pagesNumber);
  }, [pagesNumber]);

  const removeLocation = async (location: Location) => {
    if (location._id) {
      const res = await removeLocationById(location._id);
      setChanges(!changes);
      cogoToast.warn(res, {position: 'bottom-right'});
    }
  };

  return (
    !state.isLoaded ? (
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
    )
  );
};

export default Locations;