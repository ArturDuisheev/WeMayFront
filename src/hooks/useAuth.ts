import { useMutation, useQueryClient } from "@tanstack/react-query";
import authService from "../services/authService";
import { useAppDispatch } from "../store/store";
import { setIsAuth } from "../store/slices/authSlice";
import { saveTokens } from "../common/api.helpers";
import { setNotification } from "../store/slices/notificationSlice";

export const useAuth = (
  authType: "login" | "register",
  isRemember: boolean,
  onError: (error: any) => void
) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService[authType],
    onSuccess: ({ data }) => {
      dispatch(setIsAuth(true));
      saveTokens(data.tokens.access, isRemember ? data.tokens.refresh : null);
      queryClient.prefetchQuery({ queryKey: ["profile"] });
      dispatch(
        setNotification(
          `Успешн${authType === "register" ? "ая регистрация" : "ый вход"}`
        )
      );
    },
    onError
  });
};
