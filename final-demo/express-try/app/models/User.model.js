

const sql = require("./db.js");


// constructor
const User = function(User) {
  this.UserId = User.UserId
  this.Sex = User.Sex;
  this.Name = User.Name;
  this.Contact = User.Contact;
  this.StudyField = User.StudyField;
  this.Credit=User.Credit;
};





// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
User.updateByIdcredit = (UserId,Credit, User, result) => {

  sql.query(
    "UPDATE User SET Credit = ?   WHERE UserId = ?",
    [ Credit, UserId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: ", { id: UserId, ...User });
      result(null, { id: UserId, ...User });
    }
  );
};
// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！







//运用了sql语句

User.create = (newUser, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newUser}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created User: ", { id: res.insertId, ...newUser }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newUser });//未知
  });
};

User.findById = (UserId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM User WHERE UserId = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (title, result) => {
  let query = "SELECT * FROM User";

  //title不为NULL，补充query,这里要修改搜索关键字，如Name
  if (title) {
    query += ` WHERE Name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.query1 = (title, result) => {
  let query = "SELECT StudyField, AVG(MarketPrice) as avgS FROM `User` NATURAL JOIN Own NATURAL JOIN Skin GROUP BY StudyField ORDER BY avgS DESC";

  //title不为NULL，补充query,这里要修改搜索关键字，如Name
  if (title) {
    query += ` WHERE Name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.query2 = (title, result) => {
  let query = "SELECT StudyField, AVG(Highest_Rank) as avgS FROM `User` NATURAL JOIN Belong Join (SELECT TeamId as tid, Highest_Rank FROM Teams Where `LanguageId`= 0 AND Lowest_Rank > 10 ) as engproteams on TeamId =tid GROUP BY StudyField ORDER BY avgS DESC";

  //title不为NULL，补充query,这里要修改搜索关键字，如Name
  if (title) {
    query += ` WHERE Name LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};



User.updateById = (UserId, User, result) => {

  sql.query(
    "UPDATE User SET Sex = ?, Name = ?, Contact = ?, StudyField = ?,Credit = ?   WHERE UserId = ?",
    [User.Sex, User.Name, User.Contact, User.StudyField, User.Credit, UserId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: ", { id: UserId, ...User });
      result(null, { id: UserId, ...User });
    }
  );
};

User.remove = (UserId, result) => {
  // console.log("传入Id:", UserId);
  sql.query("DELETE FROM User WHERE UserId = ?", UserId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted User with UserId: ", UserId);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} User`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = User;