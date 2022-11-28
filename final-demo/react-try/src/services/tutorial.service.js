import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll() {
    return http.delete(`/tutorials`);
  }

  findByTitle(keyword) {
    return http.get(`/tutorials?Keyword=${keyword}`);
  }
  query1(){
    return http.patch(`/User/query1`);
  }
  query2(){
    return http.patch(`/User/query2`);
  }
}

export default new TutorialDataService();