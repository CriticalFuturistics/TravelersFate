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

  // Get the data
  if (mysqli_num_rows($result) > 0) {
    // Create empty array
    $players = [];
    while($row = mysqli_fetch_assoc($result)) {                                                         
      // Add a new array with name, class and race to the players array
      $newPlayer = [
        "name" => $row["name"],
        "class"=> $row["class"],
        "race" => $row["race"]        
      ];
      array_push($players, $newPlayer);      
    }

    $_SESSION['players'] = json_encode($players);
    //$_SESSION['players'] = "'" . json_encode($players) . "'";
    //$_SESSION['players'] = $players;
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
      <?php echo $_SESSION['error']; ?>
        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player1">Player 1</h5>
            <p class="center class1"> </p>
            <p class="center race1"> </p>
            <div class="card small">
              <span class="card-title activator grey-text text-darken-4 ">Stats</span>
              <p>
                <table class="highlight">
                  <thead>
                    <tr>
                        <th data-field="stat">Stat</th>
                        <th data-field="statbase">Base</th>
                        <th data-field="statbuff">Base</th>
                        <th data-field="stattotal">Total</th>
                    </tr>
                  </thead>

                  <tbody class="boldcol">
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player2">Player 2</h5>
            <p class="center class2"> </p>
            <p class="center race2"> </p>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player3">Player 3</h5>
            <p class="center class3"> </p>
            <p class="center race3"> </p>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player4">Player 4</h5>
            <p class="center class4"> </p>
            <p class="center race4"> </p>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player5">Player 5</h5>
            <p class="center class5"> </p>
            <p class="center race5"> </p>
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
    var players = <?php echo $_SESSION['players']; ?>;
    //var players = JSON.parse(JSONplayers);

    for (var i = 0; i < players.length; i++) {
      var tempI = i + 1;
      var tempP = ".player" + tempI;
      var tempC = ".class" + tempI;
      var tempR = ".race" + tempI;
      $(tempP).html(players[i].name);
      $(tempC).html(players[i].class);
      $(tempR).html(players[i].race);
    }
   
  </script>

  </body>
</html>

<!-- Closing PHP -->
<?php  ?>  