import React, { useContext, useState } from 'react';

import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { MessageType } from '../../models/message.models';
import { AppContext } from '../../stores/AppStore';

type NotificationProps = {
  messageType: MessageType;
  message: string;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification1 = ({ messageType, message }: NotificationProps) => {
  const [open, setOpen] = useState(true);

  const appStore = useContext(AppContext);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const getSeverity = () => {
    switch (messageType) {
      case MessageType.Error: return 'error';
      case MessageType.Success: return 'success';
      default: return 'error';
    }
  };

  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} onExited={() => appStore.resetNotify()}>
      <Alert onClose={handleClose} severity={getSeverity()}>
        {message.toString()}
      </Alert>
    </Snackbar>
  );
};

export default Notification1;