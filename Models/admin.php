<?php

    class Admin
    {
        // _______________________________________ Variables _______________________________________
        private $adminName;
        private $adminEmail;
        private $adminPassword;

        // _______________________________________ GETTERS _______________________________________
        public function getAdminName()
        {
            return $this->adminName;
        }
        public function getAdminEamil()
        {
            return $this->adminEmail;
        }
        public function getAdminPassword()
        {
            return $this->adminPassword;
        }
        // _______________________________________ SETTERS _______________________________________
        public function setAdminName($name)
        {
            $this->adminName = $name;
        }
        public function setAdminEamil($email)
        {
            $this->adminEmail = $email;
        }
        public function setAdminPassword($password)
        {
            $this->adminPassword = $password;
        }
        // _______________________________________ SETTERS _______________________________________
        public function Delete(Candidate $candidate)
        {
            $this->db = new DBController;
            if($this->db->OpenConnection())
            {
                $can_id = $candidate->getCandidateId();
                $query = "DELETE FROM candidate where candidate.ID = $can_id ;";
                return $this->db->insert($query);
            }
            else
            {
                echo "Connection Error";
                return false;
            }
        }
    }

?>