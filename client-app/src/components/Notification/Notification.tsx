import React, { useState } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { MessageTypes } from '../../models/message.models';

type NotificationProps = {
  messageType: MessageTypes;
  data: any;
  afterClose?: () => void;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({ messageType, data, afterClose }: NotificationProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const getSeverity = () => {
    switch (messageType) {
      case MessageTypes.Error: return 'error';
      case MessageTypes.Warning: return 'warning';
      case MessageTypes.Success: return 'success';
      default: return 'error';
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} onExited={() => afterClose && afterClose()}>
      <Alert onClose={handleClose} severity={getSeverity()}>
        {data.toString()}
      </Alert>
    </Snackbar>
  );
};

export default Notification;