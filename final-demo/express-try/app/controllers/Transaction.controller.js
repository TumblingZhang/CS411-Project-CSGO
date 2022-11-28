
//到上级文件，选择对应module
const Transaction = require("../models/Transaction.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Transaction
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "StartTime can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Transaction
  const transaction = new Transaction({
    Lender:req.body.Lender,
    Borrower: req.body.Borrower,
    SkinId: req.body.SkinId,
    StartTime: req.body.StartTime,
    Endtime: req.body.Endtime
    
  });

  // 调用model里相关函数
  // Save Transaction in the database
  Transaction.create(transaction, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction."
      });
    else res.send(data);
  });
};




// Retrieve all Transaction from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).Borrower
  const Borrower = req.query.Keyword;

  //调用
  Transaction.getAll(Borrower, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Transaction.findById(req.params.Lender, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.Lender}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Transaction with id " + req.params.Lender
        });
      }
    } else res.send(data);
  });
};

// Update a Transaction by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "StartTime can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Transaction.updateById(
    req.params.Lender,            //by id, 注这里 params和之前body不一样
    new Transaction(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Transaction with id ${req.params.Lender}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Transaction with id " + req.params.Lender
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Transaction with the specified id in the request
exports.delete = (req, res) => {
  Transaction.remove(req.params.Lender, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.Lender}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Transaction with id " + req.params.Lender
        });
      }
    } else res.send({ message: `Transaction was deleted successfully!` });
  });
};
// Delete all Transaction from the database.
exports.deleteAll = (req, res) => {
  Transaction.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Transaction were deleted successfully!` });
  });
};
