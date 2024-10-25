import Cookies from "js-cookie";

export const saveTokens = (
  accessToken: string,
  refreshToken: string | null
) => {
  localStorage.setItem("wemay-access-token", accessToken);
  refreshToken &&
    Cookies.set("wemay-refresh-token", refreshToken, { expires: 30 });
};

export const deleteTokens = () => {
  localStorage.removeItem("wemay-access-token");
  Cookies.remove("wemay-refresh-token");
};
