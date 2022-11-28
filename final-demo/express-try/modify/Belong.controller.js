
//到上级文件，选择对应module
const Belong = require("../models/Belong.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Belong
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Belong
  const belong = new Belong({
    UserId:req.body.UserId,
    TeamId: req.body.TeamId,
    
  });

  // 调用model里相关函数
  // Save Belong in the database
  Belong.create(belong, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Belong."
      });
    else res.send(data);
  });
};




// Retrieve all Belong from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).TeamId
  const TeamId = req.query.TeamId;

  //调用
  Belong.getAll(TeamId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Belong.findById(req.params.UserId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Belong with id ${req.params.UserId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Belong with id " + req.params.UserId
        });
      }
    } else res.send(data);
  });
};

// Update a Belong by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Belong.updateById(
    req.params.UserId,            //by id, 注这里 params和之前body不一样
    new Belong(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Belong with id ${req.params.UserId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Belong with id " + req.params.UserId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Belong with the specified id in the request
exports.delete = (req, res) => {
  Belong.remove(req.params.UserId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Belong with id ${req.params.UserId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Belong with id " + req.params.UserId
        });
      }
    } else res.send({ message: `Belong was deleted successfully!` });
  });
};
// Delete all Belong from the database.
exports.deleteAll = (req, res) => {
  Belong.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Belong were deleted successfully!` });
  });
};
