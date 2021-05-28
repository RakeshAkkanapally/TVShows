import { BaseService } from "./baseService";
import {
  baseUrl,
  showsURI,
  searchURI,
  seasonsURI,
  episodesURI,
} from "./serviceEndpoints.js";

export class tvShowService extends BaseService {
  async getAllShows() {
    const response = await this.get(`${baseUrl}${showsURI}`);
    return response;
  }

  async getSearchShow(searchKey) {
    const response = await this.get(`${baseUrl}${searchURI}?q=${searchKey}`);
    return response;
  }

  async getSingleShow(showId) {
    const response = await this.get(`${baseUrl}${showsURI}/${showId}`);
    return response;
  }

  async getSeasons(showId) {
    const response = await this.get(
      `${baseUrl}${showsURI}/${showId}${seasonsURI}`);
    return response;
  }

  async getEpisodes(showId) {
    const response = await this.get(
      `${baseUrl}${showsURI}/${showId}${episodesURI}`);
    return response;
  }
}
