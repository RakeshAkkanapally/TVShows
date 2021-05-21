import { BaseService } from "./baseService";
import { ServiceEndPointsList } from "./serviceEndpoints";

export class tvShowService extends BaseService{

    getAllShows(){
        return new Promise((resolve, reject)=>{
            this.get(ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI)
            .then((data)=>{
                resolve(data);
            }).catch((reason)=>{
                reject(reason);
            });
        });
    }

    getSearchShow(queryString){
        return new Promise((resolve, reject)=>{
            this.get(ServiceEndPointsList.baseUrl + ServiceEndPointsList.searchURI, "?q="+queryString)
            .then((data)=>{
                resolve(data);
            }).catch((reason)=>{
                reject(reason);
            });
        });
    }

    getSingleShow(queryString){
        return new Promise((resolve, reject)=>{
            this.get(ServiceEndPointsList.baseUrl + ServiceEndPointsList.showsURI, "/"+queryString)
            .then((data)=>{
                resolve(data);
            }).catch((reason)=>{
                reject(reason);
            });
        });
    }
}

