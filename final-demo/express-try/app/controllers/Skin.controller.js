
//到上级文件，选择对应module
const Skin = require("../models/Skin.model.js");

// 下面会调用model里面的函数，model里才是和database相关语句

//console.log方法用于在控制台输出信息。它可以接受一个或多个参数，将它们连接起来输出

// Create and Save a new Skin
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  //具体创建有哪几个元素  元素:req.body.元素
  //附：我猜 || 是赋值的意思
  // Create a Skin
  const skin = new Skin({
    SkinId:req.body.SkinId,
    WeaponType: req.body.WeaponType,
    MarketPrice: req.body.MarketPrice,
    Credit_Suggest: req.body.Credit_Suggest,
    SkinName: req.body.SkinName
  });

  // 调用model里相关函数
  // Save Skin in the database
  Skin.create(skin, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Skin."
      });
    else res.send(data);
  });
};




// Retrieve all Skin from the database (with condition).
exports.findAll = (req, res) => {
  //获取 req.query(tutorial).WeaponType
  const WeaponType = req.query.Keyword;

  //调用
  Skin.getAll(WeaponType, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data); //未知作用
  });
};



exports.findOne = (req, res) => {
  Skin.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Skin with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Skin with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Skin by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);//控制台输出信息

  Skin.updateById(
    req.params.id,            //by id, 注这里 params和之前body不一样
    new Skin(req.body),   //空白
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Skin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Skin with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Skin with the specified id in the request
exports.delete = (req, res) => {
  Skin.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Skin with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Skin with id " + req.params.id
        });
      }
    } else res.send({ message: `Skin was deleted successfully!` });
  });
};
// Delete all Skin from the database.
exports.deleteAll = (req, res) => {
  Skin.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    else res.send({ message: `All Skin were deleted successfully!` });
  });
};
