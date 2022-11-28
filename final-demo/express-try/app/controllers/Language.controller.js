
//到上级文件，选择对应module
const Language = require("../models/Language.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Language
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Language
  const language = new Language({
    LanguageId:req.body.LanguageId,
    Name: req.body.Name,
    
  });

  // 调用model里相关函数
  // Save Language in the database
  Language.create(language, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Language."
      });
    else res.send(data);
  });
};




// Retrieve all Language from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).Name
  const Name = req.query.Keyword;

  //调用
  Language.getAll(Name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Language.findById(req.params.LanguageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.LanguageId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Language with id " + req.params.LanguageId
        });
      }
    } else res.send(data);
  });
};

// Update a Language by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Language.updateById(
    req.params.LanguageId,            //by id, 注这里 params和之前body不一样
    new Language(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Language with id ${req.params.LanguageId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Language with id " + req.params.LanguageId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Language with the specified id in the request
exports.delete = (req, res) => {
  Language.remove(req.params.LanguageId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Language with id ${req.params.LanguageId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Language with id " + req.params.LanguageId
        });
      }
    } else res.send({ message: `Language was deleted successfully!` });
  });
};
// Delete all Language from the database.
exports.deleteAll = (req, res) => {
  Language.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Language were deleted successfully!` });
  });
};
