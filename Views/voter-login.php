<?php
require_once '../Models/voter.php';
require_once '../Controllers/AuthController.php';
$errMsg = "";

if(!isset($_SESSION["voterId"]))
{
  session_start();
}
if(isset($_POST['email']) && isset($_POST['password']))
{
  if(!empty($_POST['email']) && !empty($_POST['password']))
  {
    $voter = new Voter;
    $auth = new AuthController;
    $voter->setVoterEmail($_POST['email']);
    $voter->setVoterPassword($_POST['password']);
    if(!$auth->Login($voter))
    {
      $errMsg = $_SESSION["errMsg"];
    }
    else 
    {
      if($_SESSION["userRole"] == 1)
      {
        header("location: admin/index.php");
      }
      else
      {
        header("location: voter/index.php");
      }
      
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
    <link rel="shortcut icon" href="images/logo1.png" />
    <style>
      .admin-form{
        border: 2px var(--main-color) solid;
        padding: 20px;
        box-shadow: 0px 0px 4px 1px var(--main-color), 30px 30px 0px 1px var(--main-color);
      }
      .admin-form .form-control{
        border: 1px var(--main-color) solid;
        box-shadow: -2px -2px 4px 1px var(--main-color), 2px 2px 4px 1px var(--main-color);
      }
      .form-btn{
        text-decoration: none;
        background-color: var(--main-color);
        padding: 12px 24px;
        border-radius: 10px;
        color: white;
        transition: transform 250ms ease-in-out; 
        margin-left: auto; 
        margin: 10px;
        
      }
      .form-btn:hover{
        color: var(--main-color);
        background-color: white;
        box-shadow: 1px 1px 8px 1px var(--main-color), -1px -1px 8px 1px var(--main-color);
      }
    </style>
</head>
<body>
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
                    <a class="nav__a" href="register.php">Register</a>
                  </li>
                </ul>
              </div>
            </div>
        </nav>
    </header>
    <!-- Start Header -->
    
    <!-- Start Form -->
    <div class="card" style="align-items: center;">
        <div class=" container">
            <div class="col-md-12 text-center" style="display: flex; justify-content: space-around;">
                <div class="col-md-10" style="display: flex; flex-direction: column; align-items: center;">
                  <h1 class="text-center pt-5 pb-5">Login Page</h1>
                  <form action="voter-login.php" method="POST" class="admin-form" style="width: 500px; height: 400px; margin-bottom: 110px; display: flex; justify-content: space-around; flex-direction: column;border-radius: 20px;">
                      <?php
                        if($errMsg != "")
                        {
                          ?>
                          <div class="alert alert-danger" role = "alert"> <?php echo $errMsg ?> </div>
                          <?php
                        }
                      ?>
                      <div class="form-group">
                          <input required type="text" class="form-control" name ="email" placeholder="Please Enter Your Email" value="">
                      </div>
                      <div class="form-group">
                          <input required type="password" class="form-control" name ="password" placeholder="Please Enter Your Password" value="">
                      </div>
                      <div class="form-group">
                        <input type="submit" class="btnSubmit form-btn" value="Login"> <a href="register.php">Register</a>
                      </div>
                  </form>
                </div>
            </div>
        </div>
    </div>
    <!-- End Form -->

    <!-- Footer -->
    <footer class="text-center text-lg-start" style="background-color: #2c4755;">
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
    <!-- Bootstrap JS===== -->
</body>
</html>