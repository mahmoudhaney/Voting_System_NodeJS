<?php

require_once '../../Models/election.php';
require_once '../../Controllers/DBController.php';
$errMsg = "";



if(isset($_POST['name']) && isset($_POST['startDate']) && isset($_POST['endDate']))
{
  if(!empty($_POST['name']) && !empty($_POST['startDate']) && !empty($_POST['endDate']))
  {
    $election = new Election;
    $election->setName($_POST['name']);
    $election->setStartDate($_POST['startDate']);
    $election->setEndDate($_POST['endDate']);
    if($election->CreateElection($election))
    {
        echo '
            <script>
                alert("Created Successfully");
                window.location = "admin-candidates.php";
            </script>
        ';
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
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Fingerprint Voting</title>
  <!-- base:css -->
  <link rel="stylesheet" href="vendors/typicons/typicons.css">
  <link rel="stylesheet" href="vendors/css/vendor.bundle.base.css">
  <!-- endinject -->
  <!-- plugin css for this page -->
  <!-- End plugin css for this page -->
  <!-- inject:css -->
  <link rel="stylesheet" href="css/vertical-layout-light/style.css">
  <!-- endinject -->
  <link rel="shortcut icon" href="../images/logo1.png" />
  <style>
    .vote_btn{
    text-decoration: none;
    background-color: #2c4755;
    padding: 12px 24px;
    border-radius: 10px;
    color: white;
    transition: transform 250ms ease-in-out; 
    margin-left: auto; 
    margin-bottom: 10px;  
    margin-top: 10px;
    }
    .vote_btn:hover{
    color: #2c4755;
    background-color: white;
    box-shadow: 1px 1px 8px 1px #2c4755, -1px -1px 8px 1px #2c4755;
    }
    .contact-form-home{
    border: 2px #2c4755 solid;
    padding: 20px;
    box-shadow: -2px -2px 4px 1px #2c4755, 2px 2px 4px 1px #2c4755;
    }
    .contact-form-home input,
    .text_form, .input-group-text{
        margin: 3px;
        border: 1px #2c4755 solid;
        box-shadow: 0px 0px 4px 1px #2c4755, 0px 0px 4px 1px #2c4755;
    }
    .card{ 
      border-radius: 12px;
      border: 1px #2c4755 solid;
      box-shadow: -2px -2px 4px 1px #2c4755, 2px 2px 4px 1px #2c4755;
    }
  </style>
</head>
<body >

  <!-- _________________________________________Whole Page___________________________________________________________ -->
    <div class="container-scroller">

        <!-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& Start First Navbar &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& -->
        <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style="border-bottom: 4px solid #2c4755 !important;">
            <div class="navbar-brand-wrapper d-flex justify-content-center" style="background: #2c4755 !important;">
                <div class="navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100">
                <a class="navbar-brand brand-logo" href="index.php"><img src="../images/logo1.png" style="width: 60px !important; height: 50px !important;" alt="logo"/></a>
                <!-- <a class="navbar-brand brand-logo-mini" href="index.php"><img src="images/logo-mini.svg" alt="logo"/></a> -->
                <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                    <span class="typcn typcn-th-menu"></span>
                </button>
                </div>
            </div>
            
            <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                <ul class="navbar-nav mr-lg-2">
                <li class="nav-item nav-profile dropdown">
                    <span class="nav-link" href="#" data-toggle="dropdown" id="profileDropdown">
                    <img src="images/faces/face5.jpg" alt="profile"/>
                    <span class="nav-profile-name">Eugenia Mullins</span>
                    </span>
                </li>
                </ul>
                <ul class="navbar-nav navbar-nav-right">
                <!-- Settings Icon -->
                <li class="nav-item dropdown mr-0">
                    <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <i class="typcn typcn-cog-outline mx-0"></i>
                    <span class="count"></span>
                    </a>
                    <!-- Dropdown Box -->
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                    <a class="dropdown-item">
                        <i class="typcn typcn-cog-outline text-primary" style="color: #2c4755 !important;"></i>
                        Settings
                    </a>
                    <a class="dropdown-item" href="admin-logout.php">
                        <i class="typcn typcn-eject text-primary" style="color: #2c4755 !important;"></i>
                        Logout
                    </a>
                    </div>
                    <!-- Dropdown Box -->
                </li>
                <!-- Settings Icon -->
                </ul>
            </div>
        </nav>
        <!-- &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& End First Navbar &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& -->


        <!-- ################################# Start Page Content ################################# -->
        <div class="container-fluid page-body-wrapper" style="  background-color: white !important; justify-content: space-around;">
        
            <!-- ======================= 1- Start Right Sidebar ======================== -->
            <div id="right-sidebar" class="settings-panel">
                <i class="settings-close typcn typcn-times"></i>
                <ul class="nav nav-tabs" id="setting-panel" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="todo-tab" data-toggle="tab" href="#todo-section" role="tab" aria-controls="todo-section" aria-expanded="true">TO DO LIST</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="chats-tab" data-toggle="tab" href="#chats-section" role="tab" aria-controls="chats-section">CHATS</a>
                </li>
                </ul>
                <div class="tab-content" id="setting-content">
                <div class="tab-pane fade show active scroll-wrapper" id="todo-section" role="tabpanel" aria-labelledby="todo-section">
                    <div class="add-items d-flex px-3 mb-0">
                    <form class="form w-100">
                        <div class="form-group d-flex">
                        <input type="text" class="form-control todo-list-input" placeholder="Add To-do">
                        <button type="submit" class="add btn btn-primary todo-list-add-btn" id="add-task">Add</button>
                        </div>
                    </form>
                    </div>
                    <div class="list-wrapper px-3">
                    <ul class="d-flex flex-column-reverse todo-list">
                        <li>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="checkbox" type="checkbox">
                            Team review meeting at 3.00 PM
                            </label>
                        </div>
                        <i class="remove typcn typcn-delete-outline"></i>
                        </li>
                        <li>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="checkbox" type="checkbox">
                            Prepare for presentation
                            </label>
                        </div>
                        <i class="remove typcn typcn-delete-outline"></i>
                        </li>
                        <li>
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="checkbox" type="checkbox">
                            Resolve all the low priority tickets due today
                            </label>
                        </div>
                        <i class="remove typcn typcn-delete-outline"></i>
                        </li>
                        <li class="completed">
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="checkbox" type="checkbox" checked>
                            Schedule meeting for next week
                            </label>
                        </div>
                        <i class="remove typcn typcn-delete-outline"></i>
                        </li>
                        <li class="completed">
                        <div class="form-check">
                            <label class="form-check-label">
                            <input class="checkbox" type="checkbox" checked>
                            Project review
                            </label>
                        </div>
                        <i class="remove typcn typcn-delete-outline"></i>
                        </li>
                    </ul>
                    </div>
                    <div class="events py-4 border-bottom px-3">
                    <div class="wrapper d-flex mb-2">
                        <i class="typcn typcn-media-record-outline text-primary mr-2"></i>
                        <span>Feb 11 2018</span>
                    </div>
                    <p class="mb-0 font-weight-thin text-gray">Creating component page</p>
                    <p class="text-gray mb-0">build a js based app</p>
                    </div>
                    <div class="events pt-4 px-3">
                    <div class="wrapper d-flex mb-2">
                        <i class="typcn typcn-media-record-outline text-primary mr-2"></i>
                        <span>Feb 7 2018</span>
                    </div>
                    <p class="mb-0 font-weight-thin text-gray">Meeting with Alisa</p>
                    <p class="text-gray mb-0 ">Call Sarah Graves</p>
                    </div>
                </div>
                <!-- To do section tab ends -->
                <div class="tab-pane fade" id="chats-section" role="tabpanel" aria-labelledby="chats-section">
                    <div class="d-flex align-items-center justify-content-between border-bottom">
                    <p class="settings-heading border-top-0 mb-3 pl-3 pt-0 border-bottom-0 pb-0">Friends</p>
                    <small class="settings-heading border-top-0 mb-3 pt-0 border-bottom-0 pb-0 pr-3 font-weight-normal">See All</small>
                    </div>
                    <ul class="chat-list">
                    <li class="list active">
                        <div class="profile"><img src="images/faces/face1.jpg" alt="image"><span class="online"></span></div>
                        <div class="info">
                        <p>Thomas Douglas</p>
                        <p>Available</p>
                        </div>
                        <small class="text-muted my-auto">19 min</small>
                    </li>
                    <li class="list">
                        <div class="profile"><img src="images/faces/face2.jpg" alt="image"><span class="offline"></span></div>
                        <div class="info">
                        <div class="wrapper d-flex">
                            <p>Catherine</p>
                        </div>
                        <p>Away</p>
                        </div>
                        <div class="badge badge-success badge-pill my-auto mx-2">4</div>
                        <small class="text-muted my-auto">23 min</small>
                    </li>
                    <li class="list">
                        <div class="profile"><img src="images/faces/face3.jpg" alt="image"><span class="online"></span></div>
                        <div class="info">
                        <p>Daniel Russell</p>
                        <p>Available</p>
                        </div>
                        <small class="text-muted my-auto">14 min</small>
                    </li>
                    <li class="list">
                        <div class="profile"><img src="images/faces/face4.jpg" alt="image"><span class="offline"></span></div>
                        <div class="info">
                        <p>James Richardson</p>
                        <p>Away</p>
                        </div>
                        <small class="text-muted my-auto">2 min</small>
                    </li>
                    <li class="list">
                        <div class="profile"><img src="images/faces/face5.jpg" alt="image"><span class="online"></span></div>
                        <div class="info">
                        <p>Madeline Kennedy</p>
                        <p>Available</p>
                        </div>
                        <small class="text-muted my-auto">5 min</small>
                    </li>
                    <li class="list">
                        <div class="profile"><img src="images/faces/face6.jpg" alt="image"><span class="online"></span></div>
                        <div class="info">
                        <p>Sarah Graves</p>
                        <p>Available</p>
                        </div>
                        <small class="text-muted my-auto">47 min</small>
                    </li>
                    </ul>
                </div>
                <!-- chat tab ends -->
                </div>
            </div>
            <!-- ======================= End Right Sidebar ========================== -->

            <!-- ******************* 2- Start Sidebar ********************* -->
            <nav class="sidebar sidebar-offcanvas" id="sidebar" style="z-index: unset !important; min-height: unset !important">
                <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link" href="index.php">
                    <i class="typcn typcn-device-desktop menu-icon"></i>
                    <span class="menu-title">Dashboard</span>
                    <div class="badge badge-danger">new</div>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                    <i class="typcn typcn-document-text menu-icon"></i>
                    <span class="menu-title">Voters</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="ui-basic">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="admin-voters.php">Voted Users</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                    <i class="typcn typcn-film menu-icon"></i>
                    <span class="menu-title">Candidates</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="form-elements">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"><a class="nav-link" href="admin-candidates.php">Add Canddiate</a></li>
                    </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
                    <i class="typcn typcn-chart-pie-outline menu-icon"></i>
                    <span class="menu-title">Election</span>
                    <i class="menu-arrow"></i>
                    </a>
                    <div class="collapse" id="charts">
                    <ul class="nav flex-column sub-menu">
                        <li class="nav-item"> <a class="nav-link" href="create-election.php">Create Election</a></li>
                        <li class="nav-item"> <a class="nav-link" href="../ElectionsResults.php">Election History</a></li>
                    </ul>
                    </div>
                </li>
                </ul>
            </nav>
            <!-- ******************* End Sidebar *********************** -->

            <!-- ======================= 3- Create Eelction ======================= -->
            <div style=" width: 90%; margin-top: 30px;">
                <section id="contactus" >
                    <div class="container">
                        <div class="row" style="justify-content: center;">
                            <div class="col-md-10">
                                <div class="contact-form-home bg-white" style="border-radius: 20px;">
                                    <h1 class="text-center pt-3 pb-4">Create Candidate</h1>
                                    <?php
                                        if($errMsg != "")
                                        {
                                            ?>
                                                <div class="alert alert-danger" role="alert"> <?php echo $errMsg ?></div>
                                            <?php
                                        }
                                    ?>
                                    <form class="row g-3 needs-validation" action="create-election.php" method="POST" novalidate enctype="multipart/form-data">
                                        <div class="col-md-12">
                                            <label for="validationCustom01" class="form-label">Name</label>
                                            <input type="text" class="form-control" name="name" id="validationCustom01" required>
                                            <div class="valid-feedback">
                                            Looks good!
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label for="validationCustom03" class="form-label">Start Date</label>
                                            <input type="date" class="form-control" name="startDate" id="validationCustom03" required>
                                            <div class="invalid-feedback">
                                            Please provide a valid email.
                                            </div>
                                        </div>                            
                                        <div class="col-md-12">
                                            <label for="validationCustom03" class="form-label">End Date</label>
                                            <input type="date" class="form-control" name="endDate" id="validationCustom03" required>
                                            <div class="invalid-feedback">
                                            Please provide a valid email.
                                            </div>
                                        </div>                            
                                        <div class="col-12">
                                            <button class="vote_btn  me-3 mt-3 mb-3 col-md-12" type="submit">Create</button>
                                        </div>
                                    </form>
                                </div>
                            </div>           
                        </div>
                    </div>
                </section>
            </div>
            
            <!-- ======================= 3- Create Eelction ========================= -->
        
        </div>
        
        <!-- ################################## End Page Content ################################## -->
    </div>

    
    <!-- Footer -->
    <footer class="text-center text-lg-start" style="background-color: #2c4755; margin-top: 20px;  width: 100%;">
        <!-- Copyright -->
        <div class="text-center p-3" style="color: white;">
          © 2022 Copyright:
          <a class="" href="" style="color: #10cab7;">Online Voting</a>
        </div>
        <!-- Copyright -->
    </footer>
    <!-- Footer -->
  <!-- _________________________________________Whole Page___________________________________________________________ -->

  <!-- base:js -->
  <script src="vendors/js/vendor.bundle.base.js"></script>
  <!-- endinject -->
  <!-- Plugin js for this page-->
  <script src="vendors/chart.js/Chart.min.js"></script>
  <!-- End plugin js for this page-->
  <!-- inject:js -->
  <script src="js/off-canvas.js"></script>
  <script src="js/hoverable-collapse.js"></script>
  <script src="js/template.js"></script>
  <script src="js/settings.js"></script>
  <script src="js/todolist.js"></script>
  <!-- endinject -->
  <!-- Custom js for this page-->
  <script src="js/dashboard.js"></script>
  <!-- End custom js for this page-->
</body>

</html>