import http from "../http-common";

class SkinDataService {
  getAll() {
    return http.get("/Skin");
  }

  get(id) {
    return http.get(`/Skin/${id}`);
  }

  create(data) {
    return http.post("/Skin", data);
  }

  update(id, data) {
    return http.put(`/Skin/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Skin/${id}`);
  }

  deleteAll() {
    return http.delete(`/Skin`);
  }

  findByTitle(keyword) {
    return http.get(`/Skin?Keyword=${keyword}`);
  }
}

export default new SkinDataService();