// 似乎和前端有关，是前端接口
module.exports = app => {
    //require上级文件，再用controller
    const User = require("../controllers/User.controller.js");
  
    var router = require("express").Router();


  // yst!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  router.put("/:id/:credit", User.updatecredit);
  // yst!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // Create a new Tutorial
    router.post("/", User.create); // “/”是任意
  
    // Retrieve all Tutorials
    router.get("/", User.findAll);

    //id条件似乎可改,为何这里用 :id, 而不是直接/id
    // Retrieve a single Tutorial with id
    router.get("/:id", User.findOne);

    router.patch("/query1", User.query1);

    router.patch("/query2", User.query2);

    // Update a Tutorial with id
    router.put("/:id", User.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", User.delete);
  
    // Delete all Tutorials
    router.delete("/", User.deleteAll);
  
    // 距离这个是postman里的设置说明更改哪个model（数据表）
    // 比如 localhost8081/api/User
    // 然后再发送get，put，delete命令说明更改哪个model（数据表）
    app.use('/api/User', router);
  };