import axios from "axios";
import { IAddress } from "../types/types";

class MapService {
  getByName(name: string) {
    return axios.get<IAddress[]>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${name}`
    );
  }

  getByCoordinates(lat: number, lon: number) {
    return axios.get<IAddress>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
  }
}

export default new MapService();
