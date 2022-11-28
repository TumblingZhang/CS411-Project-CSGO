
//到上级文件，选择对应module
const Own = require("../models/Own.model.js");



// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

exports.findSkinsByBorrowerId = (req, res) => {
  //获取 req.query(tutorial).SkinId
  const UserId = req.params.UserId;

  //调用
  Own.getSkinsByBorrowerId(UserId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};


exports.findSkinsByLent = (req, res) => {
  //获取 req.query(tutorial).SkinId
  const UserId = req.params.UserId;

  //调用
  Own.getSkinsByLent(UserId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};


exports.deleteskin = (req, res) => {
  Own.removeskin(req.params.id,req.params.skinid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Own with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Own with id " + req.params.id
        });
      }
    } else res.send({ message: `Own was deleted successfully!` });
  });
};

exports.updatestatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Own.updateBySkinIdstatus(
    req.params.id,            //by id, 注这里 params和之前body不一样
    req.params.skinid,
    new Own(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Own with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Own with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！





//新功能：borrow
exports.borrow = (req, res) => {
  // Validate Request
  // if (!req.body) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  // }

  //console.log("Lender, Skin, Borrower:"+req.params.UserId, req.params.SkinId, req.params.BorrowerId, );//控制台输出信息

  Own.borrow(
    req.params.UserId,            //by id, 注这里 params和之前body不一样
    req.params.SkinId,
    req.params.BorrowerId,   
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Own with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Own with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

//新功能：查找Names
exports.findNamesBySkinId = (req, res) => {
  //获取 req.query(tutorial).SkinId
  const SkinId = req.params.id;
  //console.log("SkinId in Controller:" ,SkinId);
  //调用
  Own.findNamesBySkinId(SkinId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};

//新功能：按UserId查找Skin
exports.findSkinsByUserId = (req, res) => {
  //获取 req.query(tutorial).SkinId
  const UserId = req.params.UserId;

  //调用
  Own.getSkinsByUserId(UserId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};


// Create and Save a new Own
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Own
  const own = new Own({
    UserId:req.body.UserId,
    SkinId: req.body.SkinId,
    LendStatus: req.body.LendStatus,
    BorrowerId: req.body.BorrowerId,
    StartDate: req.body.StartDate,
    Credit: req.body.Credit,
    Due: req.body.Due,
    
  });

  // 调用model里相关函数
  // Save Own in the database
  Own.create(own, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Own."
      });
    else res.send(data);
  });
};




// Retrieve all Own from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).SkinId
  const SkinId = req.query.Keyword;

  //调用
  Own.getAll(SkinId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Own.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Own with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Own with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Own by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Own.updateById(
    req.params.id,            //by id, 注这里 params和之前body不一样
    req.params.skinid,
    new Own(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Own with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Own with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Own with the specified id in the request
exports.delete = (req, res) => {
  Own.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Own with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Own with id " + req.params.id
        });
      }
    } else res.send({ message: `Own was deleted successfully!` });
  });
};
// Delete all Own from the database.
exports.deleteAll = (req, res) => {
  Own.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Own were deleted successfully!` });
  });
};
