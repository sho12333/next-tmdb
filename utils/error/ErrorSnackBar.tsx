'use crient';

import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export type ISnackbarOption = {
  message: string;
  severity: string;
};

const ErrorSnack = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<ISnackbarOption>({
    message: '',
    severity: 'info',
  });

  useEffect(() => {
    if (message) {
      setOpen(true);
      setMessageInfo({ ...messageInfo, message: message });
    } else {
      setOpen(false);
    }
  }, []);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={messageInfo ? messageInfo.message : undefined}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity='error'>{messageInfo?.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default ErrorSnack;
