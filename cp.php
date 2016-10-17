<?php 
  session_start();
  if($_SESSION['authorized'] == 0){
    $_SESSION['user'] = "";
    header("location: login.php");
  } else {
    if ($_SESSION['user'] != 'admin') {
      header("location: login.php");
    }
  } 
  $host="sql.criticalfuturistics.com"; // Host name 
  $dbusername="critical58585"; // Database username 
  $dbpassword="travelers"; // Database password 
  $dbname="critical58585";  // Database name 

  // Create connection
  $con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);

  if (!$con) { die("Connection failed: " . mysqli_connect_error()); }
  $query = "SELECT * FROM players";
  $result = mysqli_query($con, $query);

  // Test failure in the result
  if (!$result) echo mysql_error();

  /**
  * Player class
  */
  class Player {
    function newPlayer(DBplayer) {
      
    }
  }
  // Get the data
  if (mysqli_num_rows($result) > 0) {
    // create empty object
    $players = [];
    while($row = mysqli_fetch_assoc($result)) {                                                         $row["name"]
      // add an array with name, class and race to the object
      
    }

    $_SESSION['players'] = "'" . json_encode($players) . "'";
    $_SESSION['error'] = "";
  } else {
    $_SESSION['error'] = "Error: Failed to get the players from the server";
  }

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <title>Traverlers' Fate</title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>

</head>
<body>
  <!-- Desktop Nav -->
  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container"><a id="logo-container" href="#" class="brand-logo">Logo</a>
      <div class="right style="padding:10px;"> Logged in as <?php echo $_SESSION["user"]; ?> </div>
      <ul class="right hide-on-med-and-down">
        <li><a href="logout.php">Logout</a></li>
      </ul>

      <ul id="nav-mobile" class="side-nav">
        <li><a href="logout.php">Logout</a></li>
      </ul>
      <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
    </div>  
  </nav>

  <div class="container">
    <div class="section">

      <!--   Icon Section   -->
      <div class="row">
      <div class="col s12 m1">
      <?php echo $_SESSION['error']; ?>
      
      </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player1">Player 1</h5><br>
            <p> <?php echo $_SESSION['test']; ?> </p>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player2">Player 2</h5>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player3">Player 3</h5>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player4">Player 4</h5>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player5">Player 5</h5>
          </div>
        </div>

      </div>

    </div>
    <br><br>

    <div class="section">

    </div>
  </div>

  <footer class="page-footer orange">
    <div class="footer-copyright">
      <div class="container">
      Copyright <a class="orange-text text-lighten-3" href="http://www.criticalfuturistics.com" target="_blank">Critical Futuristics</a> 2016
      </div>
    </div>
  </footer>


  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="js/materialize.js"></script>
  <script src="js/init.js"></script>

  <script>
    var JSONplayers = <?php echo $_SESSION['players']; ?>;
    var players = JSON.parse(JSONplayers);
    for (var i = 1; i < 6; i++) {
      var tempP = ".player" + i;
       $(tempP).html(players.name);
    }
    alert(players.name);
   
  </script>

  </body>
</html>

<!-- Closing PHP -->
<?php  ?>  