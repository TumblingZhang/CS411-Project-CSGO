// 似乎和前端有关，是前端接口
module.exports = app => {
    //require上级文件，再用controller
    const Own = require("../controllers/Own.controller.js");
  
    var router = require("express").Router();

    // yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

    router.get("/BorrowedSkins/:UserId", Own.findSkinsByBorrowerId);
    router.get("/LentSkins/:UserId", Own.findSkinsByLent);
    router.delete("/:id/:skinid", Own.deleteskin)
    router.put("/return/:id/:skinid", Own.updatestatus);


    // yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  



    //添加Borrow功能
    router.patch("/:UserId/:SkinId/:BorrowerId", Own.borrow);
  //添加查找Name功能
  router.get("/Name/:id", Own.findNamesBySkinId);
    //添加按UserId查找Skin功能
    router.get("/OwnsSkins/:UserId", Own.findSkinsByUserId);

    // Create a new Tutorial
    router.post("/", Own.create); // “/”是任意
  
    // Retrieve all Tutorials
    router.get("/", Own.findAll);


    //id条件似乎可改,为何这里用 :id, 而不是直接/id
    // Retrieve a single Tutorial with id
    router.get("/:id", Own.findOne);

    // Update a Tutorial with id
    router.put("/:id/:skinid", Own.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", Own.delete);
  
    // Delete all Tutorials
    router.delete("/", Own.deleteAll);
  



    // 距离这个是postman里的设置说明更改哪个model（数据表）
    // 比如 localhost8081/api/Own
    // 然后再发送get，put，delete命令说明更改哪个model（数据表）
    app.use('/api/Own', router);
  };