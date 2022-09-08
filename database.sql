Use votingsystem

/* 1 Create table "roles" */
Create table roles(
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL
)

/* 2 Create table "Admin" */
Create table admins (
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	Email varchar(25) UNIQUE,
	Password varchar(25),
	roleId int(11) DEFAULT NULL,
	CONSTRAINT admin_role_1 FOREIGN KEY(roleId) REFERENCES roles(ID)
)

/* 3 Create table "Election" */
Create table election(
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50),
	elec_start_date date,
	elec_end_date date,
	isActive boolean Default('1'),
	admin_id int,
	CONSTRAINT elec_adm_1 FOREIGN KEY(admin_id) REFERENCES admins(ID)
)

/* 4 Create table "Candidate" */
Create table candidate(
	ID int PRIMARY KEY AUTO_INCREMENT,
	name varchar(50),
	Email varchar(25) UNIQUE,
	Mobile varchar(25),
	photo varchar(200) DEFAULT NULL,
	nominated boolean Default('1'),
	num_of_votes int Default(0) ,
	election_id int,
	admin_id int,
	CONSTRAINT candi_elec_1 FOREIGN KEY(election_id) REFERENCES election(ID),
	CONSTRAINT candi_adm_1 FOREIGN KEY(admin_id) REFERENCES admins(ID)
)


/* 5 Create table "Voter" */
Create table voter(
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
	id_proof int UNIQUE NOT NULL,
	Password varchar(25),
	Email varchar(100),
  	voted boolean Default('0'),
	candidate_id int,
	admin_id int,
	roleId int(11) DEFAULT NULL,
	CONSTRAINT voter_cadi_1 FOREIGN KEY(candidate_id) REFERENCES candidate(ID),
	CONSTRAINT voter_adm_1 FOREIGN KEY(admin_id) REFERENCES admins(ID),
	CONSTRAINT voter_role_1 FOREIGN KEY(roleId) REFERENCES roles(ID)
)


/* 6 Create table "Many to Many" */
Create table voter_eletion(
	voter_id int,
	election_id int,
	PRIMARY KEY (voter_id, election_id),
	CONSTRAINT voter_elec_1 FOREIGN KEY(voter_id) REFERENCES voter(ID),
	CONSTRAINT voter_elec_2 FOREIGN KEY(election_id) REFERENCES election(ID)
)


INSERT INTO roles (name) VALUES ('Admin');
INSERT INTO roles (name) VALUES ('Voter');