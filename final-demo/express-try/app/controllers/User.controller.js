
//到上级文件，选择对应module
const User = require("../models/User.model.js");




// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
exports.updatecredit = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  User.updateByIdcredit(
    req.params.id,            //by id, 注这里 params和之前body不一样
    req.params.credit,
    new User(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！





// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a User
  const user = new User({
    UserId:req.body.UserId,
    Sex: req.body.Sex,
    Name: req.body.Name,
    Contact: req.body.Contact,
    StudyField: req.body.StudyField,
    Credit: req.body.Credit
  });

  // 调用model里相关函数
  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};




// Retrieve all User from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).Sex
  const title = req.query.Keyword;

  //调用
  User.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};

exports.query1 = (req, res) => {
  //获取 req.query(tutorial).Sex
  const title = req.query.Keyword;

  //调用
  User.query1(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};

exports.query2 = (req, res) => {
  //获取 req.query(tutorial).Sex
  const title = req.query.Keyword;

  //调用
  User.query2(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  User.updateById(
    req.params.id,            //by id, 注这里 params和之前body不一样
    new User(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  console.log("传入Id:", req.params.id);
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};
// Delete all User from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All User were deleted successfully!` });
  });
};
