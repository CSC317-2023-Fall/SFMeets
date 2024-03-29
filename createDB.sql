DROP DATABASE IF EXISTS sfmeets;
CREATE DATABASE sfmeets;

USE sfmeets;

DROP TABLE IF EXISTS ACCOUNT;
CREATE TABLE ACCOUNT (
    ID INT NOT NULL AUTO_INCREMENT,
    USERNAME VARCHAR(50) NOT NULL,
    PASSWORD BINARY(60) NOT NULL,
    EMAIL VARCHAR(50) NOT NULL,
    FIRSTNAME VARCHAR(50) NOT NULL,
    LASTNAME VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS EVENTS;
CREATE TABLE EVENTS (
    ID INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(50) NOT NULL,
    LOCATION VARCHAR(50) NOT NULL,
    DATE VARCHAR(50) NOT NULL,
    TIME VARCHAR(50) NOT NULL,
    DESCRIPTION VARCHAR(500) NOT NULL,
    MAXUSERS INT NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS ORGS;
CREATE TABLE ORGS (
    ID INT NOT NULL AUTO_INCREMENT,
    NAME VARCHAR(50) NOT NULL,
    DESCRIPTION VARCHAR(500) NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS ORGEVENTS;
CREATE TABLE ORGEVENTS (
    ID INT NOT NULL AUTO_INCREMENT,
    ORGID VARCHAR(50) NOT NULL,
    NAME VARCHAR(50) NOT NULL,
    LOCATION VARCHAR(50) NOT NULL,
    DATE VARCHAR(50) NOT NULL,
    TIME VARCHAR(50) NOT NULL,
    DESCRIPTION VARCHAR(500) NOT NULL,
    MAXUSERS INT NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS USEREVENTS;
CREATE TABLE USEREVENTS (
    ID INT NOT NULL AUTO_INCREMENT,
    USERID VARCHAR(50) NOT NULL,
    EVENTID VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

DROP TABLE IF EXISTS USERORGEVENTS;
CREATE TABLE USERORGEVENTS (
    ID INT NOT NULL AUTO_INCREMENT,
    USERID VARCHAR(50) NOT NULL,
    EVENTID VARCHAR(50) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO ACCOUNT (USERNAME, PASSWORD, EMAIL, FIRSTNAME, LASTNAME)
VALUES
('admin', 'admin', 'admin@admin.com', 'admin', 'admin'),
('testuser', 'test', 'tester@tester.org', 'test', 'user')
;

INSERT INTO EVENTS (NAME, LOCATION, DATE, TIME, DESCRIPTION, MAXUSERS)
VALUES
('Watch A Comedy Show', 'Punch Line SF, SF', '4/8/24', 'testtime', 'We will watch a comedy show! Come Join Us!', 20),
('Watch A Movie', 'AMC Metreon 16, SF', '4/7/24', 'testtime', 'We will watch a movie! Come Join Us!', 20),
('Watch A Play', 'Orpheum Theatre, SF', '4/6/24', 'testtime', 'We will watch a play! Come Join Us!', 20),
('Watch A Concert', 'Chase Center, SF', '4/5/24', 'testtime', 'We will watch a concert! Come Join Us!', 20),
('Watch A Soccer Game', 'Avaya Stadium, San Jose', '4/4/24', 'testtime', 'We will watch the Earthquakes play! Come Join Us!', 20),
('Watch A Hockey Game', 'SAP Center, San Jose', '4/3/24', 'testtime', 'We will watch the Sharks play! Come Join Us!', 20),
('Watch A Football Game', 'Levi Stadium, Santa Clara', '4/2/24', 'testtime', 'We will watch the 49ers play! Come Join Us!', 20),
('Watch A Basketball Game', 'Chase Center, SF', '4/1/24', 'testtime', 'We will watch the Warriors play! Come Join Us!', 20),
('Watch A Baseball Game', 'Oracle Park, SF', '3/31/24', 'testtime', 'We will watch the Giants play! Come Join Us!', 20),
('Sightseeing Tour', 'Downtown SF', '1/13/24', 'testtime', 'We Will Go Around SF', 20);
;

INSERT INTO ORGS (NAME, DESCRIPTION)
VALUES
('Music Club', 'A Place Where anyone can enjoy playing or listening to music!'),
('Cycling Club', 'A Place Where anyone can enjoy riding a bike!'),
('Hiking Club', 'A Place Where anyone can enjoy hiking!'),
('Soccer Club', 'A Place Where anyone can enjoy playing soccer!'),
('Basketball Club', 'A Place Where anyone can enjoy playing basketball!'),
('Baseball Club', 'A Place Where anyone can enjoy playing baseball!'),
('Football Club', 'A Place Where anyone can enjoy playing football!'),
('Hockey Club', 'A Place Where anyone can enjoy playing hockey!')
;

INSERT INTO ORGEVENTS (ORGID, NAME, LOCATION, DATE, TIME, DESCRIPTION, MAXUSERS)
VALUES
('1', 'Watch A Comedy Show', 'Punch Line SF, SF', '4/8/24', 'testtime', 'We will watch a comedy show! Come Join Us!', 10),
('1', 'Watch A Movie', 'AMC Metreon 16, SF', '4/7/24', 'testtime', 'We will watch a movie! Come Join Us!', 10),
('1', 'Watch A Play', 'Orpheum Theatre, SF', '4/6/24', 'testtime', 'We will watch a play! Come Join Us!', 10),
('1', 'Watch A Concert', 'Chase Center, SF', '4/5/24', 'testtime', 'We will watch a concert! Come Join Us!', 10),
('1', 'Watch A Soccer Game', 'Avaya Stadium, San Jose', '4/4/24', 'testtime', 'We will watch the Earthquakes play! Come Join Us!', 10),
('1', 'Watch A Hockey Game', 'SAP Center, San Jose', '4/3/24', 'testtime', 'We will watch the Sharks play! Come Join Us!', 10),
('4', 'Watch A Football Game', 'Levi Stadium, Santa Clara', '4/2/24', 'testtime', 'We will watch the 49ers play! Come Join Us!', 10),
('3', 'Watch A Basketball Game', 'Chase Center, SF', '4/1/24', 'testtime', 'We will watch the Warriors play! Come Join Us!', 10),
('2', 'Watch A Baseball Game', 'Oracle Park, SF', '3/31/24', 'testtime', 'We will watch the Giants play! Come Join Us!', 10),
('1', 'Sightseeing Tour', 'Downtown SF', '1/13/24', 'testtime', 'We Will Go Around SF', 10)
;

