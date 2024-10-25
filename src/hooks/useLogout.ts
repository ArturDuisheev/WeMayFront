import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../services/authService";
import { deleteTokens } from "../common/api.helpers";
import { useAppDispatch } from "../store/store";
import { setIsAuth } from "../store/slices/authSlice";
import { setNotification } from "../store/slices/notificationSlice";

export const useLogout = (message: string = "Вы успешно вышли из системы!") => {
  const dispatch = useAppDispatch();
  const quertyClient = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      deleteTokens();
      dispatch(setIsAuth(false));
      dispatch(setNotification(message));
      quertyClient.prefetchQuery({ queryKey: ["profile"] });
    },
  });
};
