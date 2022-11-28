// 似乎和前端有关，是前端接口
module.exports = app => {
    //require上级文件，再用controller
    const Belong = require("../controllers/Belong.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", Belong.create); // “/”是任意
  
    // Retrieve all Tutorials
    router.get("/", Belong.findAll);
  


    //id条件似乎可改,为何这里用 :id, 而不是直接/id
    // Retrieve a single Tutorial with id
    router.get("/:id", Belong.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Belong.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Belong.delete);
  
    // Delete all Tutorials
    router.delete("/", Belong.deleteAll);
  
    // 距离这个是postman里的设置说明更改哪个model（数据表）
    // 比如 localhost8081/api/Belong
    // 然后再发送get，put，delete命令说明更改哪个model（数据表）
    app.use('/api/Belong', router);
  };