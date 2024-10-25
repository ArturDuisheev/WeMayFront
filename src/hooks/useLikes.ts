import { useQuery } from "@tanstack/react-query";
import promotionService from "../services/promotionService";

export const useLikes = (enabled = true) =>
  useQuery({
    queryKey: ["liked-promotions"],
    queryFn: () => promotionService.getLikes(),
    select: ({ data }) => data,
    enabled,
  });
