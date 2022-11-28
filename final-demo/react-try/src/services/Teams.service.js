import http from "../http-common";

class TeamsDataService {
  joinTeam(TeamId, UserId){
    var data = {
      UserId: UserId,
      TeamId: TeamId
    }
    return http.post("/Belong", data);
  }
  getAll() {
    return http.get("/Teams");
  }

  get(id) {
    return http.get(`/Teams/${id}`);
  }

  create(data) {
    return http.post("/Teams", data);
  }

  update(id, data) {
    return http.put(`/Teams/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Teams/${id}`);
  }

  deleteAll() {
    return http.delete(`/Teams`);
  }

  findByTitle(keyword) {
    return http.get(`/Teams?Keyword=${keyword}`);
  }
}

export default new TeamsDataService();