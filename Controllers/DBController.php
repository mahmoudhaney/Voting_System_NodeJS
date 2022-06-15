<?php
    class DBController
    {
        // _______________________________________ Variables _______________________________________
        public $dbHost = "localhost";
        public $dbUser = "root";
        public $dbPasswrod = "";
        public $dbName = "votingsystem";
        // private $dbControllerObj;
        public $connection;


        // private function __construct() {
            
        // }
        // _______________________________________ Methods _______________________________________
        public function OpenConnection()
        {
            $this->connection = new mysqli($this->dbHost, $this->dbUser, $this->dbPasswrod, $this->dbName);
            if($this->connection->connect_error)
            {
                echo "Error in Connection" .$this->connection->connect_error;
                return false;
            }
            else
            {
                return true;
            }
        }

        public function CloseConnection()
        {
            if($this->connection)
            {
                $this->connection->close();
            }
            else
            {
                echo "Connection is Not Opened";
            }
        }

        public function Select($qry)
        {
            $result = $this->connection->query($qry);
            if(!$result)
            {
                echo "error: " .mysqli_error($this->connection);
                return false; 
            }
            else
            {
                return $result->fetch_all(MYSQLI_ASSOC);
            }
        }

        public function Insert($qry)
        {
            $result = $this->connection->query($qry);
            if(!$result)
            {
                echo "error: " .mysqli_error($this->connection);
                return false; 
            }
            else
            {
                return $this->connection->insert_id;
            }
        }

        public function Update($qry)
        {
            $result = $this->connection->query($qry);
            if(!$result)
            {
                echo "error: " .mysqli_error($this->connection);
                return false; 
            }
            else
            {
                return true;
            }
        }
        
        // public static function getInstance()
        // {
        //     if($dbControllerObj == null)
        //     {
        //         $dbControllerObj = new __construct();
        //     }
        //     return $dbControllerObj;
        // }




    }
?>