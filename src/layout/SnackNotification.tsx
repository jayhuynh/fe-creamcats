import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { useEffect, useState } from 'react';
import { fromNotifications, useAppDispatch } from '../store';
import { useSelector } from 'react-redux';
import { Notification, NotificationsType } from '../store/notificationsSlice';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackNotification = () => {
  const dispatch = useAppDispatch();
  const snackPack = useSelector(fromNotifications.selectNotificationPack);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<Notification | undefined>(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      dispatch(fromNotifications.doSetNotification());
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [dispatch, snackPack, messageInfo, open]);

  const handleClick = (message: string) => () => {
    // setSnackPack(prev => [...prev, {
    //   message,
    //   key: new Date().getTime(),
    // }]);
    dispatch(fromNotifications.doPushNotification({ message: message, key: new Date().getTime(), type: NotificationsType.ERROR }));
  };

  const handleClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <div>
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        onExited={handleExited}
      >
        <Alert onClose={handleClose} severity={messageInfo?.type}>
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackNotification;
