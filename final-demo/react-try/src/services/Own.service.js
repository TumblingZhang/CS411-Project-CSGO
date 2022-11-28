import http from "../http-common";
//import moment from "moment";
class OwnerDataService {

   // yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
   getBorrowedSkin(UserId){
    return http.get(`/Own/BorrowedSkins/${UserId}`);
  }
  getLentSkin(UserId){
    return http.get(`/Own/LentSkins/${UserId}`);
  }
  deleteSkin(id,skinid) {
    return http.delete(`/Own/${id}/${skinid}`);
  }
  updatecredit(id, credit) {
    //console.log("help",id,credit);
    return http.put(`/User/${id}/${credit}`);
  }
  updatestatus(id,skinid) {
    console.log("help",id,skinid);

    return http.put(`/Own/return/${id}/${skinid}`);
  }
  // yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

  
  borrowSkin(UserId, SkinId, BorrowerId){
    return http.patch(`/Own/${UserId}/${SkinId}/${BorrowerId}`);
  }
  getOwnerNames(id){
    return http.get(`/Own/Name/${id}`);
  }
  getSkinOnMarket(UserId){
    return http.get(`/Own/OwnsSkins/${UserId}`);
}
  getAll() {
    return http.get("/Own");
  }

  getOwners (id) {
    return http.get(`/Own/${id}`);
  }

  create(data) {
    return http.post("/Own", data);
  }

  update(id, data) {
    return http.put(`/Own/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Own/${id}`);
  }

  deleteAll() {
    return http.delete(`/Own`);
  }

  findByTitle(keyword) {
    return http.get(`/Own?Keyword=${keyword}`);
  }
}

export default new OwnerDataService();