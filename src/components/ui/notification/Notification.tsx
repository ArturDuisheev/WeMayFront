import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { closeNotification } from "../../../store/slices/notificationSlice";

const Notification: FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, notification, type } = useSelector(
    (state: RootState) => state.notification
  );

  const onClose = () => {
    dispatch(closeNotification());
  };

  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
