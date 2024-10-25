import { $api } from "../common/api";
import { ICategory, IResults } from "../types/types";

class Category {
  getAll() {
    return $api<IResults<ICategory>>("promotions/category/all/");
  }
}

export default new Category();
