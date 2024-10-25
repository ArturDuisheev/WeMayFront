import { $apiPrivate } from "../common/api";
import { IUser } from "../types/types";

interface IChangePasswordBody {
  new_password: string;
  re_new_password: string;
  current_password: string;
}

class ProfileService {
  async getProfile() {
    return $apiPrivate<IUser>("auth/users/me/");
  }
  async changeProfile(body: FormData) {
    return $apiPrivate.patch("users/profile/", body);
  }
  async changePassword(body: IChangePasswordBody) {
    return $apiPrivate.post("auth/users/set_password/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

export default new ProfileService();
