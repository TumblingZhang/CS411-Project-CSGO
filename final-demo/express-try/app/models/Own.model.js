

const sql = require("./db.js");


// constructor
const Own = function(Own) {
  this.UserId = Own.UserId
  this.SkinId = Own.SkinId
  this.LendStatus = Own.LendStatus
  this.BorrowerId = Own.BorrowerId
  this.StartDate = Own.StartDate
  this.Credit = Own.Credit
  this.Due = Own.Due;
};





// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

Own.getSkinsByBorrowerId = (UserId, result) => {

  // console.log("UserIdInModel:",UserId)
  let query = `SELECT * FROM Own NATURAL JOIN Skin WHERE BorrowerId = ${UserId} AND LendStatus = 0`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Own: ", res);
    result(null, res);
  });
};


Own.getSkinsByLent = (UserId, result) => {

  // console.log("UserIdInModel:",UserId)
  let query = `SELECT * FROM Own NATURAL JOIN Skin WHERE UserId = ${UserId} and LendStatus = 0 `;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Own: ", res);
    result(null, res);
  });
};


Own.removeskin = (UserId,SkinId, result) => {
  sql.query("DELETE FROM Own WHERE UserId = ? and SkinId= ?", [UserId, SkinId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Own with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Own with UserId: ", UserId);
    result(null, res);
  });
};


Own.updateBySkinIdstatus = (UserId, SkinId, Own, result) => {

  sql.query(
    "UPDATE Own SET LendStatus = 1   WHERE BorrowerId = ? and SkinId= ?",
    [UserId, SkinId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Own with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Own: ", { id: UserId, ...Own });
      result(null, { id: UserId, ...Own });
    }
  );
};


// yst ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！






//新功能：borrow
Own.borrow = (UserId, SkinId, BorrowerId, result) => {
  var sd = require('silly-datetime');
  var currentDate=sd.format(new Date(), 'YYYY-MM-DD');
  //console.log(time);
  sql.query(
    "UPDATE Own SET LendStatus = ?, BorrowerId = ?, StartDate = ?   WHERE UserId = ? and SkinId= ?",
    [0, BorrowerId, currentDate, UserId, SkinId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Own with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Own: ", { UserId, SkinId, BorrowerId, currentDate});
      result(null, { id: UserId, ...Own });
    }
  );
};

//新功能：findNamesBySkinId
Own.findNamesBySkinId = (SkinId, result) => {

  // console.log("UserIdInModel:",UserId)
  let query = `SELECT * FROM Own NATURAL JOIN 
  (SELECT UserId, Name, Sex, StudyField, Contact FROM User) as t1
  WHERE SkinId = ${SkinId} AND LendStatus = 1`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Own: ", res);
    result(null, res);
  });
};

//新功能：getSkinsByUserId
Own.getSkinsByUserId = (UserId, result) => {

  // console.log("UserIdInModel:",UserId)
  let query = `SELECT * FROM Own NATURAL JOIN Skin WHERE UserId = ${UserId}`;


  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Own: ", res);
    result(null, res);
  });
};

//运用了sql语句

Own.create = (newOwn, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newOwn}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Own SET ?", newOwn, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Own: ", { id: res.insertId, ...newOwn }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newOwn });//未知
  });
};
//这里我改成返回数组了，因为要所有的Owners
Own.findById = (UserId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT DISTINCT UserId FROM Own WHERE SkinId = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      // console.log("found Own: ", res[0]);
      console.log("found Own: ", res);
      // result(null, res[0]);
      result(null, res);
      return;
    }

    // not found Own with the id
    result({ kind: "not_found" }, null);
  });
};

Own.getAll = (SkinId, result) => {
  let query = "SELECT * FROM Own";

  //title不为NULL，补充query
  if (SkinId) {
    query += ` WHERE SkinId LIKE '%${SkinId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Own: ", res);
    result(null, res);
  });
};



Own.updateById = (UserId, SkinId, Own, result) => {

  sql.query(
    "UPDATE Own SET SkinId = ?   WHERE UserId = ? and SkinId= ?",
    [Own.SkinId, UserId, SkinId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Own with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Own: ", { id: UserId, ...Own });
      result(null, { id: UserId, ...Own });
    }
  );
};

Own.remove = (UserId, result) => {
  sql.query("DELETE FROM Own WHERE UserId = ?", UserId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Own with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Own with UserId: ", UserId);
    result(null, res);
  });
};

Own.removeAll = result => {
  sql.query("DELETE FROM Own", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Own`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Own;