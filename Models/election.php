<?php

// require_once '../Models/election.php';
// require_once '../Controllers/DBController.php';

    class Election
    {
        // _______________________________________ Variables _______________________________________
        private $id;
        private $Name;
        private $Year;
        private $StartDate;
        private $EndDate;
        protected $db;
        // _______________________________________ GETTERS _______________________________________
        public function getId()
        {
            return $this->id;
        }
        public function getName()
        {
            return $this->Name;
        }
        public function getYear()
        {
            return $this->Year;
        }
        public function getStartDate()
        {
            return $this->StartDate;
        }
        public function getEndDate()
        {
            return $this->EndDate;
        }
        // _______________________________________ SETTERS _______________________________________
        public function setName($name)
        {
            $this->Name = $name;
        }
        public function setYear($year)
        {
            $this->Year = $year;
        }
        public function setStartDate($start)
        {
            $this->StartDate = $start;
        }
        public function setEndDate($end)
        {
            $this->EndDate = $end;
        }
        public function setId($id)
        {
            $this->id = $id;
        }
        // _______________________________________ Other Methods _______________________________________
        public function CreateElection(Election $election)
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $getName = $election->getName();
                $getStartDate = $election->getStartDate();
                $getEndDate = $election->getEndDate();
                $query = "insert into election (name, elec_start_date, elec_end_date) VALUES ('$getName', '$getStartDate', '$getEndDate');";
                return $this->db->insert($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }

        public function getCurrentElections()
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "select * FROM election where isActive = 1;";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }

        public function getFinishedElections()
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "Select election.ID, election.name, election.elec_start_date, election.elec_end_date, SUM(candidate.num_of_votes) As Total_Votes from candidate Right Join election ON candidate.election_id = election.ID WHERE election.isActive = 0 Group by election.name;";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }
        public function RegisterObserver()
        {
            $var = 'yes';
            
        }
        public function UnRegisterObserver()
        {
            $var = 'no';

        }
        public function Notify()
        {
            $candi = new Candidate;
            $candi->Update();
            $voter = new Voter;
            $voter->Update();
        }

        
    }

?>