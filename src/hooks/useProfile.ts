import { useQuery } from "@tanstack/react-query";
import profileService from "../services/profileService";

export const useProfile = (isDisabled = true) => {
  const accessToken = localStorage.getItem("wemay-access-token");
  const isEnabled = !!accessToken && !isDisabled;

  return useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
    select: ({ data }) => data,
    enabled: isEnabled,
  });
};
