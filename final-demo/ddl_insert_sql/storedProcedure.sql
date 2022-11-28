use csgo
DELIMITER $$
CREATE PROCEDURE update_team_avg(
  IN choice INT,
        IN User_id INT
)
BEGIN
DECLARE finished INTEGER DEFAULT 0;
DECLARE temp_id INTEGER DEFAULT 0;
DECLARE team_avg_Credit INTEGER DEFAULT 0;
DECLARE finished2 INTEGER DEFAULT 0;
DECLARE temp_id2 INTEGER DEFAULT 0;
DECLARE team_avg_Credit2 INTEGER DEFAULT 0;
DECLARE curteam_avg
  CURSOR FOR
    SELECT TeamId FROM Teams;

DECLARE cur2
  CURSOR FOR
    SELECT TeamId FROM Teams NATURAL JOIN 
                (select TeamId 
                from Belong 
                where UserId = User_id ) as t0;

DECLARE CONTINUE HANDLER
FOR NOT FOUND SET finished = 1;

IF choice = 1 THEN
 OPEN curteam_avg;
 getTeamInfo: LOOP
    FETCH curteam_avg INTO temp_id;
    IF finished = 1 THEN
      LEAVE getTeamInfo;
    END IF;
            
    SET team_avg_Credit = (select avg(Credit) 
        from Teams NATURAL JOIN 
                                (select * 
                                from Belong NATURAL JOIN `User`) as t1
        where TeamId = temp_id);
    UPDATE Teams SET avg_Credit = team_avg_Credit WHERE TeamId = temp_id;
 END LOOP getTeamInfo;   
 CLOSE curteam_avg;
ELSE
 OPEN cur2;
 getTeamInfo2: LOOP
    FETCH cur2 INTO temp_id2;
    IF finished = 1 THEN
      LEAVE getTeamInfo2;
    END IF;
            
    SET team_avg_Credit2 = (select avg(Credit) 
        from Teams NATURAL JOIN 
                                (select *
                                from Belong NATURAL JOIN `User`) as t2
        where TeamId = temp_id2);
    UPDATE Teams SET avg_Credit = team_avg_Credit2 WHERE TeamId = temp_id2;
 END LOOP getTeamInfo2;   
 CLOSE cur2;
END IF;
END$$
DELIMITER $$;
