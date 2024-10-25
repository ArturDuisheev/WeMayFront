import { useMutation, useQueryClient } from "@tanstack/react-query";
import promotionService from "../services/promotionService";

export const useLikePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promotionService.like,
    onSuccess: () => {
      queryClient.prefetchQuery({ queryKey: ["liked-promotions"] });
    },
  });
};
