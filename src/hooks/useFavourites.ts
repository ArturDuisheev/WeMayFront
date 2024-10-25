import { useQuery } from "@tanstack/react-query";
import promotionService from "../services/promotionService";

export const useFavourites = () =>
  useQuery({
    queryKey: ["favourite-promotions"],
    queryFn: () => promotionService.getFavourites(),
    select: ({ data }) => data,
  });
