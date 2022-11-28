

const sql = require("./db.js");


// constructor
const Transaction = function(Transaction) {
  this.Lender = Transaction.Lender
  this.Borrower = Transaction.Borrower;
  this.SkinId=Transaction.SkinId;
  this.StartTime=Transaction.StartTime;
  this.Endtime=Transaction.Endtime
};

//运用了sql语句

Transaction.create = (newTransaction, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newTransaction}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Transaction SET ?", newTransaction, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Transaction: ", { id: res.insertId, ...newTransaction }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newTransaction });//未知
  });
};

Transaction.findById = (Lender, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Transaction WHERE Lender = ${Lender}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Transaction: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Transaction with the id
    result({ kind: "not_found" }, null);
  });
};

Transaction.getAll = (Borrower, result) => {
  let query = "SELECT * FROM Transaction";

  //title不为NULL，补充query
  if (Borrower) {
    query += ` WHERE Borrower LIKE '%${Borrower}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Transaction: ", res);
    result(null, res);
  });
};



Transaction.updateById = (Lender, Transaction, result) => {

  sql.query(
    "UPDATE Transaction SET Borrower = ?, SkinId= ?,StartTime=?,Endtime=?  WHERE Lender = ?",
    [Transaction.Borrower,Transaction.SkinId,Transaction.StartTime,Transaction.Endtime, Lender],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Transaction with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Transaction: ", { id: Lender, ...Transaction });
      result(null, { id: Lender, ...Transaction });
    }
  );
};

Transaction.remove = (Lender, result) => {
  sql.query("DELETE FROM Transaction WHERE Lender = ?", Lender, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Transaction with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Transaction with Lender: ", Lender);
    result(null, res);
  });
};

Transaction.removeAll = result => {
  sql.query("DELETE FROM Transaction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Transaction`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Transaction;