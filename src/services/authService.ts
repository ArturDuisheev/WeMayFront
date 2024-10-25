import { ILoginResponse, IRegisterResponse } from "./../types/types";
import { $api, $apiPrivate } from "../common/api";
import { IAuthFields } from "../types/types";

interface IResetPasswordFields {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

class AuthService {
  async register(data: IAuthFields) {
    return $api.post<IRegisterResponse>("users/register/", {
      email: data.email,
      password: data.password,
    });
  }
  async login(data: IAuthFields) {
    return $api.post<ILoginResponse>("users/login/", {
      email: data.email,
      password: data.password,
    });
  }
  async forgotPassword(email: string) {
    return $api.post("auth/users/reset_password/", { email });
  }
  async resetPassword(body: IResetPasswordFields) {
    return $api.post("auth/users/reset_password_confirm/", body);
  }
  async logout() {
    return $apiPrivate.post("users/logout/");
  }
}

export default new AuthService();
