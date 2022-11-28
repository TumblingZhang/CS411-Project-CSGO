

const sql = require("./db.js");


// constructor
const Login = function(Login) {
  this.Email = Login.Email
  this.Password = Login.Password;
};

//运用了sql语句

Login.create = (newLogin, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newLogin}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Login SET ?", newLogin, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Login: ", { id: res.insertId, ...newLogin }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newLogin });//未知
  });
};

Login.findById = (Email, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Login WHERE Email = ${Email}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Login: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Login with the id
    result({ kind: "not_found" }, null);
  });
};

Login.getAll = (Email, result) => {
  let query = "SELECT * FROM Login";

  //title不为NULL，补充query
  if (Email) {
    query += ` WHERE Email = '${Email}'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Login: ", res);
    result(null, res);
  });
};



Login.updateById = (Email, Login, result) => {

  sql.query(
    "UPDATE Login SET Password = ?   WHERE Email = ?",
    [Login.Password, Email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Login with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Login: ", { id: Email, ...Login });
      result(null, { id: Email, ...Login });
    }
  );
};

Login.remove = (Email, result) => {
  sql.query("DELETE FROM Login WHERE Email = ?", Email, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Login with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Login with Email: ", Email);
    result(null, res);
  });
};

Login.removeAll = result => {
  sql.query("DELETE FROM Login", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Login`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Login;