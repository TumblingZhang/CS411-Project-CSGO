

const sql = require("./db.js");


// constructor
const Language = function(Language) {
  this.LanguageId = Language.LanguageId
  this.Name = Language.Name;
};

//运用了sql语句

Language.create = (newLanguage, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newLanguage}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Language SET ?", newLanguage, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Language: ", { id: res.insertId, ...newLanguage }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newLanguage });//未知
  });
};

Language.findById = (LanguageId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Language WHERE LanguageId = ${LanguageId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Language: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Language with the id
    result({ kind: "not_found" }, null);
  });
};

Language.getAll = (Name, result) => {
  let query = "SELECT * FROM Language";

  //title不为NULL，补充query
  if (Name) {
    query += ` WHERE Name LIKE '%${Name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Language: ", res);
    result(null, res);
  });
};



Language.updateById = (LanguageId, Language, result) => {

  sql.query(
    "UPDATE Language SET Name = ?   WHERE LanguageId = ?",
    [Language.Name, LanguageId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Language with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Language: ", { id: LanguageId, ...Language });
      result(null, { id: LanguageId, ...Language });
    }
  );
};

Language.remove = (LanguageId, result) => {
  sql.query("DELETE FROM Language WHERE LanguageId = ?", LanguageId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Language with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Language with LanguageId: ", LanguageId);
    result(null, res);
  });
};

Language.removeAll = result => {
  sql.query("DELETE FROM Language", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Language`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Language;