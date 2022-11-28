import http from "../http-common";

class ProfileDataService {

  getUser (id) {
    return http.get(`/User/${id}`);
  }


}

export default new ProfileDataService();