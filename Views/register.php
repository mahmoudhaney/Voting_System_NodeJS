<?php
require_once '../Models/voter.php';
require_once '../Controllers/AuthController.php';
$errMsg = "";

if(isset($_POST['name']) && isset($_POST['idProof']) && isset($_POST['email']) && isset($_POST['password']))
{
  if(!empty($_POST['name']) && !empty($_POST['idProof']) && !empty($_POST['email']) && !empty($_POST['password']))
  {
    $voter = new Voter;
    $auth = new AuthController;
    $voter->setVoterName($_POST['name']);
    $voter->setVoterIdProof($_POST['idProof']);
    $voter->setVoterPassword($_POST['password']);
    $voter->setVoterEmail($_POST['email']);
    if($auth->register($voter))
    {
      echo '
        <script>
          alert("Registered Successfully");
          window.location = "voter-login.php";
        </script>
      ';
    }
    else 
    {
      $errMsg = $_SESSION["errMsg"];
    }
  }
  else
  {
    $errMsg = "Please fill all fields";
  }
}
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
    <!-- Custom CSS --> 
    <link rel="shortcut icon" href="images/logo1.png" />
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
                </ul>
              </div>
            </div>
        </nav>
    </header>
    <!-- Start Header -->

    <!-- Contact Us -->
    <section id="contactus" style="background-color: #f6f6ff; padding: 50px; min-height: 90vh;">
      <div class="container">
          <div class="row" style="justify-content: center;">
              <div class="col-md-6">
                  <div class="contact-form-home bg-white" style="border-radius: 20px;">
                      <h1 class="text-center pt-2 pb-5">Register Now</h1>
                      <?php
                        if($errMsg != "")
                        {
                          ?>
                            <div class="alert alert-danger" role="alert"> <?php echo $errMsg ?></div>
                          <?php
                        }
                      ?>
                      <form class="row g-3 needs-validation" action="register.php" method="POST" novalidate>
                          <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">Name</label>
                            <input type="text" class="form-control" name="name" id="validationCustom01" required>
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div class="col-md-6">
                            <label for="validationCustom01" class="form-label">ID Proof</label>
                            <input type="text" class="form-control" name="idProof" id="validationCustom01" required>
                            <div class="valid-feedback">
                              Looks good!
                            </div>
                          </div>
                          <div class="col-md-12">
                            <label for="validationCustom03" class="form-label">Email</label>
                            <input type="text" class="form-control" name="email" id="validationCustom03" required>
                            <div class="invalid-feedback">
                              Please provide a valid email.
                            </div>
                          </div>                            
                          <div class="col-md-12">
                            <label for="validationCustom03" class="form-label">Password</label>
                            <input type="password" class="form-control" name="password" id="validationCustom03" required>
                            <div class="invalid-feedback">
                              Please provide a valid email.
                            </div>
                          </div>                            
                          <div class="col-10">
                            <button class="vote_btn  me-3 mt-3 mb-3 col-md-10" type="submit">Register</button> <a href="voter-login.php" class=" col-md-2 col-md-2">Login</a>
                          </div>
                      </form>
                  </div>
              </div>           
          </div>
      </div>
    </section>
    <!-- Contact Us -->

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