import { useQuery } from "@tanstack/react-query";
import promotionService from "../services/promotionService";

export const useMyPromotions = () =>
  useQuery({
    queryKey: ["my-promotions"],
    queryFn: () => promotionService.getMy(),
    select: ({ data }) => data,
  });
