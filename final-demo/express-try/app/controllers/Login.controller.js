
//到上级文件，选择对应module
const Login = require("../models/Login.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Login
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Login
  const login = new Login({
    Email:req.body.Email,
    Password: req.body.Password,
    
  });

  // 调用model里相关函数
  // Save Login in the database
  Login.create(login, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Login."
      });
    else res.send(data);
  });
};




// Retrieve all Login from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).Password
  const Email = req.query.Keyword;

  //调用
  Login.getAll(Email, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  console.log("email:",req.params.Email);
  Login.findById(req.params.Email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Login with id ${req.params.Email}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Login with id " + req.params.Email
        });
      }
    } else res.send(data);
  });
};

// Update a Login by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Login.updateById(
    req.params.Email,            //by id, 注这里 params和之前body不一样
    new Login(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Login with id ${req.params.Email}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Login with id " + req.params.Email
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Login with the specified id in the request
exports.delete = (req, res) => {
  Login.remove(req.params.Email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Login with id ${req.params.Email}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Login with id " + req.params.Email
        });
      }
    } else res.send({ message: `Login was deleted successfully!` });
  });
};
// Delete all Login from the database.
exports.deleteAll = (req, res) => {
  Login.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Login were deleted successfully!` });
  });
};
