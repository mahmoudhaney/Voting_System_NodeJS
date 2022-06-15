<?php

//  require_once '../Models/admin.php';
// require_once '../Controllers/DBController.php';
// include ('../Controllers/DBController.php');

    class Candidate
    {
        // _______________________________________ Variables _______________________________________
        private $candidateId;
        private $name;
        private $email;
        private $mobile;
        private $photo;
        private $Elec_id;
        protected $db;

        // _______________________________________ GETTERS _______________________________________
        public function getCandidateName()
        {
            return $this->name;
        }
        public function getCandidateEmail()
        {
            return $this->email;
        }
        public function getCandidateMobile()
        {
            return $this->mobile;
        }
        public function getCandidatePhoto()
        {
            return $this->photo;
        }
        public function getCandidateId()
        {
            return $this->candidateId;
        }
        public function getElectionId()
        {
            return $this->Elec_id;
        }
        // _______________________________________ SETTERS _______________________________________
        public function setCandidateName($name)
        {
            $this->name = $name;
        }
        public function setCandidateEmail($email)
        {
            $this->email = $email;
        }
        public function setCandidateMobile($mob)
        {
            $this->mobile = $mob;
        }
        public function setCandidatePhoto($photo)
        {
            $this->photo = $photo;
        }
        public function setCandidateId($id)
        {
            $this->candidateId = $id;
        }
        public function setElectionId($el_id)
        {
            $this->Elec_id = $el_id;
        }
        // _______________________________________ Methods _______________________________________
        public function getAllCandidates()
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "select candidate.ID, candidate.name, candidate.Email, candidate.photo, candidate.nominated, candidate.num_of_votes  FROM candidate;";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }
        public function getWinnerCandidate()
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "select candidate.name,candidate.num_of_votes FROM candidate LEFT JOIN election ON candidate.election_id=election.ID WHERE candidate.num_of_votes=(SELECT MAX( candidate.num_of_votes) from candidate );";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }
        public function AddCandidate(Candidate $candidate)
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $getName = $candidate->getCandidateName();
                $getEmail = $candidate->getCandidateEmail();
                $getMobile = $candidate->getCandidateMobile();
                $getPhoto = $candidate->getCandidatePhoto();
                $getEleID = $candidate->getElectionId();
                $query = "insert into candidate (name, Email, Mobile, photo, election_id) VALUES ('$getName', '$getEmail', '$getMobile', '$getPhoto', $getEleID);";
                return $this->db->insert($query);
                
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        
        }
        public function DeleteCandi(Admin $ad)
        {
            $candidate = new Candidate;
            $ad->Delete($candidate);
        }
        public function Update()
        {
            $vari = 'You can nominte now';
        }





    }

?>