import http from "../http-common";

class RichestMajorService {
  getAll() {
    return http.get("/User");
  }

  get(id) {
    return http.get(`/User/${id}`);
  }

  create(data) {
    return http.post("/User", data);
  }

  update(id, data) {
    return http.put(`/User/${id}`, data);
  }

  delete(id) {
    return http.delete(`/User/${id}`);
  }

  deleteAll() {
    return http.delete(`/User`);
  }

  findByTitle(keyword) {
    return http.get(`/User?Keyword=${keyword}`);
  }
  query1(){
    return http.patch(`/User/query1`);
  }
  query2(){
    return http.patch(`/User/query2`);
  }
}

export default new RichestMajorService();