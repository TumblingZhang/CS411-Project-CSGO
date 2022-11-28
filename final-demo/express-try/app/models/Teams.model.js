

const sql = require("./db.js");


// constructor
const Teams = function(Team) {
  this.TeamId = Team.TeamId
  this.FoundTime = Team.FoundTime;
  this.FounderId = Team.FounderId;
  this.NumMember = Team.NumMember;
  this.LanguageId = Team.LanguageId;
  this.Lowest_Rank= Team.Lowest_Rank;
  this.Highest_Rank= Team.Highest_Rank;
};

//运用了sql语句

Teams.create = (newTeam, result) => {
  //sql语句，将后面结构赋值到？里。 应该等价于${newTeam}, 不清楚结构是否一定要用？
  //sql.query似乎是执行命令
  sql.query("INSERT INTO Teams SET ?", newTeam, (err, res) => {
    if (err) {
      //未知，但似乎每个都有一个一模一样的这个语句，所以应该直接复制没问题
      console.log("error: ", err);//控制台输出信息
      result(err, null);
      return;
    }

    console.log("created Team: ", { id: res.insertId, ...newTeam }); //控制台输出信息 “id: res.insertId”，“...newTutorial”未知
    result(null, { id: res.insertId, ...newTeam });//未知
  });
};

Teams.findById = (TeamId, result) => {
  // 这里等于判断用 ${变量}， 等价于用？
  sql.query(`SELECT * FROM Teams WHERE TeamId = ${TeamId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Team: ", res[0]);//未知
      result(null, res[0]);
      return;
    }

    // not found Teams with the id
    result({ kind: "not_found" }, null);
  });
};

Teams.getAll = (FoundTime, result) => {
  let query = "SELECT * FROM Teams";

  //title不为NULL，补充query
  if (FoundTime) {
    query += ` WHERE FoundTime LIKE '%${FoundTime}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Teams: ", res);
    result(null, res);
  });
};



Teams.updateById = (TeamId, Team, result) => {

  sql.query(
    "UPDATE Teams SET FoundTime = ?, FounderId = ?, NumMember = ?, LanguageId = ?, Lowest_Rank = ?, Highest_Rank = ?  WHERE TeamId = ?",
    [Team.FoundTime, Team.FounderId, Team.NumMember, Team.LanguageId, Team.Lowest_Rank, Team.Highest_Rank, TeamId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Teams with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Team: ", { id: TeamId, ...Team });
      result(null, { id: TeamId, ...Team });
    }
  );
};

Teams.remove = (TeamId, result) => {
  sql.query("DELETE FROM Teams WHERE TeamId = ?", TeamId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Teams with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted Team with TeamId: ", TeamId);
    result(null, res);
  });
};

Teams.removeAll = result => {
  sql.query("DELETE FROM Teams", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} Teams`);
    result(null, res);
  });
};

// module.exports = 结构；
module.exports = Teams;