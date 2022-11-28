DELIMITER $$;
USE csgo;
CREATE DEFINER=`root`@`localhost` TRIGGER `user_AFTER_UPDATE` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
call update_team_avg( 0 , NEW.UserId );
END$$
DELIMITER $$;

DELIMITER $$;
USE csgo;
CREATE DEFINER=`root`@`localhost` TRIGGER `belong_AFTER_DELETE` AFTER DELETE ON `belong` FOR EACH ROW BEGIN
DECLARE finished2 INTEGER DEFAULT 0;
DECLARE id INTEGER DEFAULT 0;
DECLARE new_avg_credit INTEGER DEFAULT 0;
DECLARE cur_team
		CURSOR FOR 
				SELECT TeamId FROM `User` NATURAL JOIN Belong
                WHERE UserId = OLD.UserId;
DECLARE CONTINUE HANDLER
FOR NOT FOUND SET finished2 = 1;
OPEN cur_team;
updateTeamInfo: LOOP
				FETCH cur_team INTO id;
                IF finished2 = 1 THEN
							LEAVE updateTeamInfo;
				END IF;
				SET new_avg_credit = (select avg(Credit) 
							from Teams NATURAL JOIN Belong NATURAL JOIN `User`
                            where TeamId = id);
			UPDATE Teams SET avg_Credit = new_avg_credit WHERE TeamId = id;
END LOOP updateTeamInfo;
CLOSE cur_team;
UPDATE Teams SET NumMember = NumMember - 1 WHERE TeamId = OLD.TeamId;
END$$
DELIMITER $$;

DELIMITER $$;
USE csgo;
CREATE DEFINER=`root`@`localhost` TRIGGER `belong_AFTER_INSERT` AFTER INSERT ON `belong` FOR EACH ROW BEGIN
DECLARE finished2 INTEGER DEFAULT 0;
DECLARE id INTEGER DEFAULT 0;
DECLARE new_avg_credit INTEGER DEFAULT 0;
DECLARE cur_team
		CURSOR FOR 
				SELECT TeamId FROM `User` NATURAL JOIN Belong
                WHERE UserId = New.UserId;
DECLARE CONTINUE HANDLER
FOR NOT FOUND SET finished2 = 1;
OPEN cur_team;
updateTeamInfo: LOOP
				FETCH cur_team INTO id;
                IF finished2 = 1 THEN
							LEAVE updateTeamInfo;
				END IF;
				SET new_avg_credit = (select avg(Credit) 
							from Teams NATURAL JOIN Belong NATURAL JOIN `User`
                            where TeamId = id);
			UPDATE Teams SET avg_Credit = new_avg_credit WHERE TeamId = id;
END LOOP updateTeamInfo;
CLOSE cur_team;
UPDATE Teams SET NumMember = NumMember + 1 WHERE TeamId = NEW.TeamId;
END$$
DELIMITER $$;