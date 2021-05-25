import { BaseService } from "./baseService";
import { ServiceEndPointsList } from "./serviceEndpoints";

export class tvShowService extends BaseService {
  async getAllShows() {
    try {
      const response = await this.get(
        ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI
      );
      return response;
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  }

  async getSearchShow(queryString) {
    try {
      const response = await this.get(
        ServiceEndPointsList.baseUrl + ServiceEndPointsList.searchURI,
        "?q=" + queryString
      );
      return response;
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  }

  async getSingleShow(queryString) {
    try {
      const response = await this.get(
        ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI,
        "/" + queryString
      );
      return response;
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  }

  async getSeasons(queryString) {
    try {
      const response = await this.get(
        ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI,
        "/" + queryString + ServiceEndPointsList.seasonsURI
      );
      return response;
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  }

  async getEpisode(queryString) {
    try {
      const response = await this.get(
        ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI,
        "/" + queryString + ServiceEndPointsList.episodesURI
      );
      return response;
    } catch (e) {
      console.error("The Promise is rejected!", e);
    }
  }
}
