<?php
require_once '../Models/election.php';
require_once '../Models/candidate.php';
require_once '../Controllers/AuthController.php';

$elections = new Election;
$elections = $elections->getFinishedElections();

$winner = new Candidate;
$winner = $winner->getWinnerCandidate();

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fingerprint Voting</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/bootstrap.css">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <!-- Google Fonts -->
    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/stylesheet.css">
    <link rel="stylesheet" href="css/stylesheet.css">
    <link rel="shortcut icon" href="images/logo1.png" />
    <style>
        .card{
            
            border-radius: 12px;
            border: 1px var(--main-color) solid;
            box-shadow: -2px -2px 4px 1px var(--main-color), 2px 2px 4px 1px var(--main-color);
        }
        .singleCard{
            margin: 50px;
        }
        .myEspB{
          padding: 10px; 
          margin: 6px;
          background-color: #2c4755; 
          color: white;
          border-radius: 50%;
        }
  </style>
    <!-- Custom CSS --> 
</head>
<body style="position: relative; min-height:100vh;">
    <!-- Start Header -->
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark">
            <div class="container-fluid container">
              <a class="navbar-brand" href="index.html"><img src="images/logo1.png" width="60px" height="50px" alt="Online Voting"></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li class="nav__li">
                    <a class="nav__a" aria-current="page" href="index.html">Home</a>
                  </li>
                  <li class="nav__li">
                    <a class="nav__a" href="voter-login.php">Login</a>
                  </li>
                  <li class="nav__li">
                    <a class="nav__a" href="register.html">Register</a>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    </header>
    <!-- Start Header -->


    <!-- Elections Cards -->
    <div class="container">
      <div class="row">
          <div class="col-md-12 mb-5">
              <h1 class="text-center mt-5 mb-2">Election History</h1>
          </div>
          <div class="cards col-md-12 mb-5" style="display: flex; flex-wrap: wrap;">
              <?php
                if(count($elections) == 0)
                {
                    ?>
                        <div class="alert alert-danger text-center" role="alert">There is no election history</div>
                    <?php
                }
                else
                {
                  foreach($elections as $elec)
                  {
                    ?>
                      <div class="col-md-3 singleCard">
                        <div class="card" >
                          <div class="card-body" style="display: flex; flex-direction: column;">
                            <div class="body_text text-start" style="    display: flex; flex-direction: column;align-items: flex-start;">
                                <span class="card-text">Election Name: <b><?php echo $elec['name'] ?></b></span><hr>
                                <span class="card-text">Start Date: <b><?php echo $elec['elec_start_date'] ?></b></span><hr>
                                <span class="card-text">End Date: <b><?php echo $elec['elec_end_date'] ?></b></span><hr>
                                <span class="card-text">Total Votes: <b class="myEspB"><?php echo $elec['Total_Votes'] ?></b></span><hr>
                                <span class="card-text">Winner Candidate: <b class="myEspB"><?php echo $winner[0]['name'] ?></b></span><hr>
                                <span class="card-text">His Total Votes: <b class="myEspB"><?php echo $winner[0]['num_of_votes'] ?></b></span>
                            </div>                          
                          </div>
                        </div>
                    </div>
                    <?php
                  }
                }
              ?>
          </div>
      </div>
    </div>
    <!-- Elections Cards -->


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
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.js"></script>   
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script> -->
    <!-- Bootstrap JS===== -->
</body>
</html>