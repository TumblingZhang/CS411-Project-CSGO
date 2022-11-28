
//到上级文件，选择对应module
const Comment = require("../models/Comment.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Comment
  const comment = new Comment({
    FromId:req.body.FromId,
    ToId: req.body.ToId,
    CommentDate: req.body.CommentDate,
    Content: req.body.Content,
    Rating: req.body.Rating
    
  });

  // 调用model里相关函数
  // Save Comment in the database
  Comment.create(comment, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    else res.send(data);
  });
};




// Retrieve all Comment from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).ToId
  const ToId = req.query.Keyword;

  //调用
  Comment.getAll(ToId, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Comment.findById(req.params.FromId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.FromId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Comment with id " + req.params.FromId
        });
      }
    } else res.send(data);
  });
};

// Update a Comment by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Comment.updateById(
    req.params.FromId,            //by id, 注这里 params和之前body不一样
    new Comment(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.FromId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.FromId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Comment with the specified id in the request
exports.delete = (req, res) => {
  Comment.remove(req.params.FromId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.FromId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Comment with id " + req.params.FromId
        });
      }
    } else res.send({ message: `Comment was deleted successfully!` });
  });
};
// Delete all Comment from the database.
exports.deleteAll = (req, res) => {
  Comment.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Comment were deleted successfully!` });
  });
};
