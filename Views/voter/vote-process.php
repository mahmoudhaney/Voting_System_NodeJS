<?php

require_once '../../Models/candidate.php';
require_once '../../Models/voter.php';
require_once '../../Controllers/DBController.php';


// Voting Process
$oldVotes = $_POST['getVotes']; //Num of votes before Voting
$newVotes = $oldVotes + 1;      //Num of votes after Voting
$currentCandidateId = $_POST['getId'];  //ID of chosen Candidate
session_start();
$currentVoterId = $_SESSION["voterId"]; //ID of voter who has chosen a candidate
$db;
$db = new DBController;
if($db->OpenConnection())
{
    $votes_query = "update candidate set num_of_votes = '$newVotes' where ID = $currentCandidateId ";
    $voted_status_query = "update voter set voted = 1 where ID = $currentVoterId ";
    $updated_votes = $db->Update($votes_query);
    $update_user_status = $db->Update($voted_status_query);
}
else
{
    echo "Connection Error";
    return false;
}



if($updated_votes and $update_user_status)
{

    echo '
        <script>
            alert("Voted Successfully");
            window.location = "index.php";
        </script>
    ';
}
else
{
    echo '
        <script>
            alert("Some Error Occured");
            window.location = "index.php";
        </script>
    ';
}



?>
