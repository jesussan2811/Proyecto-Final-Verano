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

drop table Boardgames;
drop table Favorites;

SELECT B.*, F.FID FROM Boardgames B inner join Favorites F on F.IdBoardgame = B.BID



