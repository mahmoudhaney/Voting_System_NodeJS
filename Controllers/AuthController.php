<?php

require_once '../Models/admin.php';
require_once '../Models/voter.php';
require_once '../Controllers/DBController.php';

class AuthController
{
    protected $db;

    // _______________________________________ Methods _______________________________________
    public function Login(Voter $voter)
    {
        $this->db = new DBController;
        if($this->db->OpenConnection())
        {
            $getIdEmail = $voter->getVoterEmail();
            $getPassword = $voter->getVoterPassword();
            $query = "select * from voter where Email='$getIdEmail' and password = '$getPassword'";
            $result = $this->db->Select($query);
            if($result === false)
            {
                echo "Error in Query";
                return false;
            }
            else
            {
                if(count($result) == 0)
                {
                    $_SESSION["errMsg"] = "Wrong email or password";
                    $this->db->CloseConnection();
                    return false;
                }
                else
                {
                    session_start();
                    $_SESSION["voterId"] = $result[0]["ID"];
                    $_SESSION["voter_idproof"] = $result[0]["id_proof"];
                    $_SESSION["userRole"] = $result[0]["roleId"];
                    $this->db->CloseConnection();
                    return true;
                }
            }
        }
        else
        {
            echo "Error in Database Connection";
            return false;
        }
    }

    public function register(Voter $voter)
    {
        $this->db = new DBController;
        if($this->db->OpenConnection())
        {
            $getName = $voter->getVoterName();
            $getId = $voter->getVoterIdProof();
            $getPasseord = $voter->getVoterPassword();
            $getEmail = $voter->getVoterEmail();
            $query = "insert into voter (name, id_proof, Password, Email, roleId) VALUES ('$getName', '$getId', '$getPasseord', '$getEmail', 2);";
            // $result = $this->db->insert($query);
            if($this->db->insert($query))
            {
                return true;
            }
            else
            {
                $_SESSION["errMsg"] = "Something went wrong";
                return false;
            }
            
        }
        else
        {
            echo "Connection Error";
            return false;
        }
        
    }




}
  
?>