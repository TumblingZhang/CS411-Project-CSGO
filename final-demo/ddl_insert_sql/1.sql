USE csgo;
CREATE TABLE `User` (
    UserId INT NOT NULL ,
    Sex VARCHAR(10),
    `Name` VARCHAR(30), 
    Contact VARCHAR(30), 
    StudyField VARCHAR(10),
    Credit INT,
    PRIMARY KEY (UserId)
);
CREATE TABLE `Language`(
	LanguageId INT NOT NULL,
    `Name` VARCHAR(30),
    PRIMARY KEY (LanguageId)
);
CREATE TABLE Speak(
	UserId INT NOT NULL,
    LanguageId INT,
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (LanguageId) REFERENCES `Language`(LanguageId) ON DELETE CASCADE
);


CREATE TABLE Login(
	Email VARCHAR(30) NOT NULL, 
	`Password` VARCHAR(30), 
    UserId INT,
    PRIMARY KEY (Email),
    FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE
);
CREATE TABLE `Use`(
	UserId INT NOT NULL,
	Email VARCHAR(30), 
    PRIMARY KEY (UserId),
    FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (Email) REFERENCES Login(Email) ON DELETE CASCADE
);


CREATE TABLE Teams(
	TeamId INT NOT NULL, 
	FoundTime Date, 
    FounderId INT, 
    NumMember INT, 
    `LanguageId` INT, 
    Lowest_Rank INT, 
    Highest_Rank INT,
    avg_Credit Decimal,
    PRIMARY KEY (TeamId),
    FOREIGN KEY (FounderId) REFERENCES `User`(UserId) ON DELETE CASCADE
);
CREATE TABLE Belong(
	UserId INT NOT NULL,
    TeamId INT NOT NULL,
    PRIMARY KEY (UserId,TeamId),
    FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (TeamId) REFERENCES `Teams`(TeamId) ON DELETE CASCADE
);

CREATE TABLE Skin(
	SkinId INT NOT NULL, 
    WeaponType VARCHAR(30), 
    MarketPrice Decimal, 
    Credit_Suggest INT, 
    SkinName VARCHAR(30),
    PRIMARY KEY(SkinId)
);
CREATE TABLE Own(
	UserId INT, 
    SkinId INT,
    LendStatus INT,
    BorrowerId INT,
    StartDate Date,
    Credit INT,
    Due INT,
    PRIMARY KEY(UserId,SkinId),
    FOREIGN KEY (UserId) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (BorrowerId) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (SkinId) REFERENCES Skin(SkinId) ON DELETE CASCADE
);


CREATE TABLE `Transaction`(
	Lender INT NOT NULL, 
    Borrower INT NOT NULL,
    SkinId INT,
    StartTime Date, 
    EndTime Date, 
    CreditPledged INT,
    PRIMARY KEY (Lender, Borrower),
    FOREIGN KEY (Lender) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (Borrower) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (SkinId) REFERENCES Skin(SkinId) ON DELETE CASCADE
);
CREATE TABLE `Comment`(
	`From` INT, 
	`To` INT, 
	CommentDate Date, 
    Content VARCHAR(100), 
    Rating INT,
	FOREIGN KEY (`From`) REFERENCES `User`(UserId) ON DELETE CASCADE,
    FOREIGN KEY (`To`) REFERENCES `User`(UserId) ON DELETE CASCADE
);
