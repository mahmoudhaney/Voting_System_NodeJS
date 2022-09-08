-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 08, 2022 at 06:49 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `votingsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `Email` varchar(25) DEFAULT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `Email` varchar(25) DEFAULT NULL,
  `Mobile` varchar(25) DEFAULT NULL,
  `photo` varchar(200) DEFAULT NULL,
  `nominated` tinyint(1) DEFAULT 1,
  `num_of_votes` int(11) DEFAULT 0,
  `election_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`ID`, `name`, `Email`, `Mobile`, `photo`, `nominated`, `num_of_votes`, `election_id`, `admin_id`) VALUES
(6, 'candidate1', 'candidate1@email', '2143', '../uploads/03-19-5108-34-25candidate1.jpg', 1, 2, 3, NULL),
(7, 'candidate2', 'candidate2@email', '2413', '../uploads/03-20-0608-34-48candidate2.jpg', 1, 1, 3, NULL),
(8, 'candidate3', 'candidate3@email', '231', '../uploads/03-20-2112-25-36candidate3.jpg', 1, 1, 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `election`
--

CREATE TABLE `election` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `elec_start_date` date DEFAULT NULL,
  `elec_end_date` date DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `admin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `election`
--

INSERT INTO `election` (`ID`, `name`, `elec_start_date`, `elec_end_date`, `isActive`, `admin_id`) VALUES
(3, 'People', '2022-09-01', '2022-09-10', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `name`) VALUES
(1, 'Admin'),
(2, 'Voter');

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE `voter` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_proof` int(11) NOT NULL,
  `Password` varchar(25) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `voted` tinyint(1) DEFAULT 0,
  `candidate_id` int(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`ID`, `name`, `id_proof`, `Password`, `Email`, `voted`, `candidate_id`, `admin_id`, `roleId`) VALUES
(6, 'Mahmoud Haney Saeed', 10203040, '12345', 'mahmoudhaney25@gmail.com', 0, NULL, NULL, 1),
(7, 'voter1', 2431, '123', 'voter1@email', 1, NULL, NULL, 2),
(8, 'voter2', 412, '123', 'voter2@email', 1, NULL, NULL, 2),
(9, 'voter3', 234, '123', 'voter3@email', 1, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `voter_eletion`
--

CREATE TABLE `voter_eletion` (
  `voter_id` int(11) NOT NULL,
  `election_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `admin_role_1` (`roleId`);

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD KEY `candi_elec_1` (`election_id`),
  ADD KEY `candi_adm_1` (`admin_id`);

--
-- Indexes for table `election`
--
ALTER TABLE `election`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `elec_adm_1` (`admin_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `id_proof` (`id_proof`),
  ADD KEY `voter_cadi_1` (`candidate_id`),
  ADD KEY `voter_adm_1` (`admin_id`),
  ADD KEY `voter_role_1` (`roleId`);

--
-- Indexes for table `voter_eletion`
--
ALTER TABLE `voter_eletion`
  ADD PRIMARY KEY (`voter_id`,`election_id`),
  ADD KEY `voter_elec_2` (`election_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `election`
--
ALTER TABLE `election`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `voter`
--
ALTER TABLE `voter`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admins`
--
ALTER TABLE `admins`
  ADD CONSTRAINT `admin_role_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`ID`);

--
-- Constraints for table `candidate`
--
ALTER TABLE `candidate`
  ADD CONSTRAINT `candi_adm_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`ID`),
  ADD CONSTRAINT `candi_elec_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`ID`);

--
-- Constraints for table `election`
--
ALTER TABLE `election`
  ADD CONSTRAINT `elec_adm_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`ID`);

--
-- Constraints for table `voter`
--
ALTER TABLE `voter`
  ADD CONSTRAINT `voter_adm_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`ID`),
  ADD CONSTRAINT `voter_cadi_1` FOREIGN KEY (`candidate_id`) REFERENCES `candidate` (`ID`),
  ADD CONSTRAINT `voter_role_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`ID`);

--
-- Constraints for table `voter_eletion`
--
ALTER TABLE `voter_eletion`
  ADD CONSTRAINT `voter_elec_1` FOREIGN KEY (`voter_id`) REFERENCES `voter` (`ID`),
  ADD CONSTRAINT `voter_elec_2` FOREIGN KEY (`election_id`) REFERENCES `election` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
