import React, { useState } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { MessageTypes } from '../../models/messages.models';

type NotificationProps = {
  messageType: MessageTypes;
  text: string;
  afterClose: () => void;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = ({ messageType, text, afterClose }: NotificationProps) => {
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
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} onExited={() => afterClose()}>
      <Alert onClose={handleClose} severity={getSeverity()}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;