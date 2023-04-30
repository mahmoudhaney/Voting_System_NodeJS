create database votingsystem;

Use votingsystem;

/* 1 Create table Users */
Create table users(
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	id_proof varchar(255) UNIQUE NOT NULL,
    email varchar(255),
	password varchar(255),
	voted boolean Default(0),
	token varchar(255) Not Null,
    role boolean default(0) Not Null
);

/* 2 Create table "Election" */
Create table elections(
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50),
	start_date date,
	end_date date,
	is_active boolean Default(1),
    admin_id int references users (ID)
);

/* 3 Create table "Candidate" */
Create table candidates(
	ID int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50),
	email varchar(25) UNIQUE,
	mobile varchar(25) UNIQUE,
	photo varchar(200) DEFAULT NULL,
	num_of_votes int Default(0) ,
    election_id int references elections (ID),
	admin_id int references users (ID)
);