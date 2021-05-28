import axios from "axios";

export class BaseService {
  get(endpoint, queryString) {
    const url = queryString ? endpoint + queryString : endpoint;

    return axios.get(url);
  }
}
