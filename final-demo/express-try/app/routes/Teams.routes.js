// 似乎和前端有关，是前端接口
module.exports = app => {
    //require上级文件，再用controller
    const Teams = require("../controllers/Teams.controller.js");
  
    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", Teams.create); // “/”是任意
  
    // Retrieve all Tutorials
    router.get("/", Teams.findAll);
  


    //id条件似乎可改,为何这里用 :id, 而不是直接/id
    // Retrieve a single Tutorial with id
    router.get("/:id", Teams.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", Teams.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Teams.delete);
  
    // Delete all Tutorials
    router.delete("/", Teams.deleteAll);
  
    // 距离这个是postman里的设置说明更改哪个model（数据表）
    // 比如 localhost8081/api/Teams
    // 然后再发送get，put，delete命令说明更改哪个model（数据表）
    app.use('/api/Teams', router);
  };