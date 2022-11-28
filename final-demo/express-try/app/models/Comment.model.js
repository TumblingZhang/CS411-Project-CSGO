

const sql = require("./db.js");


// constructor
const Comment = function(Comment) {
  this.FromId = Comment.FromId
  this.ToId = Comment.ToId;
  this.CommentDate=Comment.CommentDate;
  this.Content=Comment.Content;
  this.Rating=Comment.Rating
};

//运用了sql语句

Comment.create = (newComment, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newComment}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Comment SET ?", newComment, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Comment: ", { id: res.insertId, ...newComment }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newComment });//未知
  });
};

Comment.findById = (FromId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Comment WHERE FromId = ${FromId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Comment: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Comment with the id
    result({ kind: "not_found" }, null);
  });
};

Comment.getAll = (ToId, result) => {
  let query = "SELECT * FROM Comment";

  //title不为NULL，补充query
  if (ToId) {
    query += ` WHERE ToId LIKE '%${ToId}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Comment: ", res);
    result(null, res);
  });
};



Comment.updateById = (FromId, Comment, result) => {

  sql.query(
    "UPDATE Comment SET ToId = ?, CommentDate= ?,Content=?,Rating=?  WHERE FromId = ?",
    [Comment.ToId,Comment.CommentDate,Comment.Content,Comment.Rating, FromId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Comment: ", { id: FromId, ...Comment });
      result(null, { id: FromId, ...Comment });
    }
  );
};

Comment.remove = (FromId, result) => {
  sql.query("DELETE FROM Comment WHERE FromId = ?", FromId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Comment with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Comment with FromId: ", FromId);
    result(null, res);
  });
};

Comment.removeAll = result => {
  sql.query("DELETE FROM Comment", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Comment`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Comment;