<?php

// require_once '../Models/voter.php';
// require_once '../Controllers/DBController.php';
// include ('../Controllers/DBController.php');

    class Voter
    {
        // _______________________________________ Variables _______________________________________
        private $voterName;
        private $voter_idproof;
        private $voterPassword;
        private $email;
        protected $db;
        // _______________________________________ GETTERS _______________________________________
        public function getVoterName()
        {
            return $this->voterName;
        }
        public function getVoterIdProof()
        {
            return $this->voter_idproof;
        }
        public function getVoterPassword()
        {
            return $this->voterPassword;
        }
        public function getVoterEmail()
        {
            return $this->email;
        }
        // _______________________________________ SETTERS _______________________________________
        public function setVoterName($name)
        {
            $this->voterName = $name;
        }
        public function setVoterIdProof($idProof)
        {
            $this->voter_idproof = $idProof;
        }
        public function setVoterPassword($password)
        {
            $this->voterPassword = $password;
        }
        public function setVoterEmail($email)
        {
            $this->email = $email;
        }
        // _______________________________________ Methods _______________________________________
        public function getAllVoters()
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "select voter.ID, voter.name,voter.Email, voter.id_proof, voter.voted FROM voter where roleId = 2;";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }

        public function getSpecificVoter()
        {
            $hisID = $_SESSION["voterId"];
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $query = "select voter.name, voter.id_proof, voter.voted FROM voter where ID = $hisID;";
                return $this->db->Select($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }

        public function Update()
        {
            $vari = 'You can vote now';
        }


    }

?>