// 似乎和前端有关，是前端接口
module.exports = app => {
    //require上级文件，再用controller
    const Login = require("../controllers/Login.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Login.create); // “/”是任意
  
    // Retrieve all Tutorials
    router.get("/", Login.findAll);
  


    //id条件似乎可改,为何这里用 :id, 而不是直接/id
    // Retrieve a single Tutorial with id
    router.get("/:id", Login.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Login.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Login.delete);
  
    // Delete all Tutorials
    router.delete("/", Login.deleteAll);
  
    // 距离这个是postman里的设置说明更改哪个model（数据表）
    // 比如 localhost8081/api/Login
    // 然后再发送get，put，delete命令说明更改哪个model（数据表）
    app.use('/api/Login', router);
  };