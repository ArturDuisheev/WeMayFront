import { useMutation, useQueryClient } from "@tanstack/react-query";
import promotionService from "../services/promotionService";

export const useAddToFavouritePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: promotionService.addToFavourite,
    onSuccess: () => {
      queryClient.prefetchQuery({ queryKey: ["favourite-promotions"] });
    },
  });
};
