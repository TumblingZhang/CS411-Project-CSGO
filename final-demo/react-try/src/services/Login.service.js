import http from "../http-common";

class LoginDataService {
    findByTitle(keyword) {
        return http.get(`/Login?Keyword=${keyword}`);
      }
  getAll() {
    return http.get("/Login");
  }

  get(id) {
    return http.get(`/Login/${id}`);
  }

  create(data) {
    return http.post("/Login", data);
  }

  update(id, data) {
    return http.put(`/Login/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Login/${id}`);
  }

  deleteAll() {
    return http.delete(`/Login`);
  }

  query1(){
    return http.patch(`/Login/query1`);
  }
  query2(){
    return http.patch(`/Login/query2`);
  }
}

export default new LoginDataService();