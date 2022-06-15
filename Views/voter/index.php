<?php
session_start();
if(!isset($_SESSION["userRole"])) //In Admin Page
{
  header("location: ../voter-login.php");
}
else
{
  if($_SESSION["userRole"] != 2)
  {
    header("location: ../voter-login.php");
  }
}

require_once '../../Models/candidate.php';
require_once '../../Models/election.php';
require_once '../../Models/voter.php';
require_once '../../Controllers/DBController.php';

// Get Current Election
$elections = new Election;
$elections = $elections->getCurrentElections();

// Get All Candidates
$candidates = new Candidate;
$candidates = $candidates->getAllCandidates();
// Get a Specific Voter
$voters = new Voter;
$voters = $voters->getSpecificVoter();



?>


<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fingerprint Voting</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../css/bootstrap.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <!-- Google Fonts -->
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../css/stylesheet.css">
    <link rel="shortcut icon" href="../images/logo1.png" />
    <style>
        .card{
            
            border-radius: 12px;
            border: 1px var(--main-color) solid;
            box-shadow: -2px -2px 10px 1px var(--main-color), 2px 2px 10px 1px var(--main-color);
        }
        .SingleCArd{
            margin: 50px;
        }
        .card_btn{
            text-decoration: none;
            background-color: var(--main-color);
            padding: 10px 22px;
            border-radius: 10px;
            color: white; 
            margin-bottom: 10px;  
            margin-top: 10px;
            width: 47%;
        }
        .disable_btn{
            background-color: greenyellow;
            padding: 10px 22px;
            border-radius: 10px;
            color: white; 
            margin-bottom: 10px;  
            margin-top: 10px;
            width: 47%;
        }
        .card_btn:hover{
            color: var(--main-color);
            background-color: white;
            box-shadow: 1px 1px 8px 1px var(--main-color), -1px -1px 8px 1px var(--main-color);
        }
        .voterInfo{
            width: 100%;
            background-color: white;
            
        }
        .voterInfoB{
            background-image: linear-gradient(to right, var(--grey-color), white, var(--grey-color));
            min-height: 100px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border: 2px var(--main-color) solid;
            box-shadow: 0px 0px 2px 1px var(--main-color), 30px 30px 0px 1px var(--main-color);
            border-radius: 50px;
        }
    </style>
    <!-- Custom CSS --> 
</head>
<body style="position: relative; min-height:100vh;">
    <!-- Start Header -->
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid container">
              <a class="navbar-brand" href="../index.html"><img src="../images/logo1.png" width="60px" height="50px" alt="Online Voting"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav__li">
                    <a class="nav__a" aria-current="page" href="../index.html">Home</a>
                  </li>
                  <li class="nav__li">
                    <a class="nav__a" href="voter-logout.php">Logout</a>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    </header>
    <!-- Start Header -->
    

    <!-- Start Candidates Cards -->
    <div class="container">
        <div class="row">
            <!-- Voter Info -->
            <div class="col-md-12 mb-5 mt-5 voterInfo">
                <div class="voterInfoB">
                    <span>Name: <b><?php echo $voters[0]['name']; ?></b></span>
                    <span>ID Proof: <b><?php echo $voters[0]['id_proof']; ?></b></span>
                    <span>Voted: 
                        <b style="color: green;">
                            <?php
                                if($voters[0]['voted'] == 0)
                                {
                                    ?>
                                        <b style="color: red;"><?php echo "NO"; ?></b>
                                    <?php
                                }
                                else
                                {
                                    ?>
                                        <b style="color: green;"><?php echo "YES"; ?></b>
                                    <?php
                                }
                            ?>
                        </b>
                    </span>
                </div>
            </div>
            <!-- Voter Info -->
            <div class="col-md-12">
                <h1 class="text-center mt-5 ">Choose Only One Candidate</h1>
            </div>
            <?php
                if(count($elections) == 0)
                {
                    ?>
                        <div class="alert alert-danger text-center" role="alert"> Can't Can't Choose any Candidate, Election Not Available Now</div>
                    <?php
                }
                else
                {
                    ?>
                        <div class="cards col-md-12 mb-5" style="display: flex; flex-wrap: wrap; justify-content: center;">
                <?php
                    if(count($candidates) == 0)
                    {
                        ?>
                            <div class="alert alert-danger" role="alert" style="text-align: center;">No Candidates for Now</div>
                        <?php
                    }
                    else
                    {
                        foreach($candidates as $candidate)
                        {
                            ?>
                                <div class="col-md-3 SingleCArd">
                                    <div class="card" >
                                        <img class="card-img-top text-center" src="<?php echo $candidate['photo'] ?>" alt="Candidate" height="350px">
                                            <div class="card-body" style="display: flex; flex-direction: column;">
                                                <div class="body_text">
                                                    <h3 class="card-title text-center"><?php echo $candidate['name'] ?></h3>
                                                    <p class="card-text text-center"><?php echo $candidate['Email'] ?></p>
                                                    <p class="card-text text-center"><?php echo $candidate['num_of_votes'] ?> Votes</p>
                                                </div>
                                                <div class="body_btns text-center">
                                                    <form action="vote-process.php" method="POST">
                                                        <input type="hidden" name="getVotes" value="<?php echo $candidate['num_of_votes'] ?>">
                                                        <input type="hidden" name="getId" value="<?php echo $candidate['ID'] ?>">
                                                        <?php
                                                            if($voters[0]['voted'] == 0)
                                                            {
                                                                ?>
                                                                    <button class="card_btn" type="submit">Vote</button>
                                                                <?php
                                                            }
                                                            else
                                                            {
                                                                ?>
                                                                    <button disabled class="disable_btn" style="background-color: green;" type="submit">Done</button>
                                                                    <p style="color: red;">Not Allow To Vote Again</p>
                                                                <?php
                                                            }
                                                        ?>
                                                        
                                                    </form>
                                                </div>                           
                                            </div>
                                        </img>
                                    </div>
                                </div>
                            <?php
                        }
                    }
                ?>
                
            </div>
                    <?php
                }
            ?>
            
        </div>
    </div>
    <!-- End Candidates Cards -->    


    <!-- Footer -->
    <footer class="text-center text-lg-start" style="background-color: #2c4755; position: absolute; bottom: 0; width: 100%;">
        <!-- Copyright -->
        <div class="text-center p-3" style="color: white;">
          © 2022 Copyright:
          <a class="" href="" style="color: #10cab7;">Online Voting</a>
        </div>
        <!-- Copyright -->
      </footer>
    <!-- Footer -->

    <!-- Bootstrap JS===== -->
    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.js"></script>   
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
    <!-- Bootstrap JS===== -->
</body>
</html>