

const sql = require("./db.js");


// constructor
const Skin = function(skin) {
  this.SkinId = skin.SkinId
  this.WeaponType = skin.WeaponType;
  this.MarketPrice = skin.MarketPrice;
  this.Credit_Suggest = skin.Credit_Suggest;
  this.SkinName = skin.SkinName;
};

//运用了sql语句

Skin.create = (newSkin, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newSkin}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Skin SET ?", newSkin, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created skin: ", { id: res.insertId, ...newSkin }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newSkin });//未知
  });
};

Skin.findById = (SkinId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Skin WHERE SkinId = ${SkinId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found skin: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Skin with the id
    result({ kind: "not_found" }, null);
  });
};

Skin.getAll = (WeaponType, result) => {
  let query = "SELECT * FROM Skin";

  //title不为NULL，补充query
  if (WeaponType) {
    query += ` WHERE WeaponType LIKE '%${WeaponType}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Skin: ", res);
    result(null, res);
  });
};



Skin.updateById = (SkinId, skin, result) => {

  sql.query(
    "UPDATE Skin SET WeaponType = ?, MarketPrice = ?, Credit_Suggest = ?, SkinName = ? WHERE SkinId = ?",
    [skin.WeaponType, skin.MarketPrice, skin.Credit_Suggest, skin.SkinName, SkinId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Skin with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated skin: ", { id: SkinId, ...skin });
      result(null, { id: SkinId, ...skin });
    }
  );
};

Skin.remove = (SkinId, result) => {
  sql.query("DELETE FROM Skin WHERE SkinId = ?", SkinId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Skin with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted skin with SkinId: ", SkinId);
    result(null, res);
  });
};

Skin.removeAll = result => {
  sql.query("DELETE FROM Skin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Skin`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Skin;