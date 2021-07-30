create database VeranoWeb;

use VeranoWeb;

create table Boardgames(
BID int not null auto_increment,
BName varchar(80) not null,
Publisher varchar(60) not null,
Category varchar(2) not null,
BDescription varchar(200),
BYear varchar(4),
primary key(BID)
);

create table Favorites(
FID int not null auto_increment,
IdBoardgame int not null,
primary key(FID),
constraint FK_FAVBOARD foreign key (IdBoardgame) references Boardgames (BID)
);


INSERT INTO Boardgames (BName,Publisher,Category,BDescription,BYear) VALUES 
("Monopoly","Hasbro","15","it's Just monopoly","1986"),
("Pictionary","Hasbro","12","Just draw it","1994"),
("Risk","Wargames","13","Conquer theworld","1988");

INSERT INTO Favorites (IdBoardgame) values
(2),(1);


SELECT B.*, F.FID FROM Boardgames B LEFT JOIN Favorites F on F.IdBoardgame = B.BID;
select * from boardgames where BID = 3
select * from boardgames


drop table Boardgames;
drop table Favorites;