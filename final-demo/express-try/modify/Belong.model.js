

const sql = require("./db.js");


// constructor
const Belong = function(Belong) {
  this.UserId = Belong.UserId
  this.TeamId = Belong.TeamId;
};

//运用了sql语句

Belong.create = (newBelong, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newBelong}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Belong SET ?", newBelong, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Belong: ", { id: res.insertId, ...newBelong }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newBelong });//未知
  });
};

Belong.findById = (UserId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Belong WHERE UserId = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Belong: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Belong with the id
    result({ kind: "not_found" }, null);
  });
};

Belong.getAll = (TeamId, result) => {
  let query = "SELECT * FROM Belong";

  //title不为NULL，补充query
  if (TeamId) {
    query += ` WHERE TeamId LIKE '%${TeamId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Belong: ", res);
    result(null, res);
  });
};



Belong.updateById = (UserId, Belong, result) => {

  sql.query(
    "UPDATE Belong SET TeamId = ?   WHERE UserId = ?",
    [Belong.TeamId, UserId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Belong with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Belong: ", { id: UserId, ...Belong });
      result(null, { id: UserId, ...Belong });
    }
  );
};

Belong.remove = (UserId, result) => {
  sql.query("DELETE FROM Belong WHERE UserId = ?", UserId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Belong with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Belong with UserId: ", UserId);
    result(null, res);
  });
};

Belong.removeAll = result => {
  sql.query("DELETE FROM Belong", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Belong`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Belong;