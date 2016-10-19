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
        "race" => $row["race"],
        "level" => $row["level"],
        "stats" => ["VIT" => $row["VIT"], "FOR" => $row["FOR"], 
                    "AGI" => $row["AGI"], "INT" => $row["INT"],
                    "VOL" => $row["VOL"], "TEM" => $row["TEM"],
                    "SAG" => $row["SAG"]
                  ],
        "equip" => $row["equip"]
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

  // Another query for another table
  $query = "SELECT * FROM races";
  $result = mysqli_query($con, $query);

  // Test failure in the result
  if (!$result) echo mysql_error();

  // Get the data
  if (mysqli_num_rows($result) > 0) {
    // Create empty array
    $races = [];
    while($row = mysqli_fetch_assoc($result)) {                                                         
      // Add a new array with name, class and race to the players array
      $newRace = [
        "racename" => $row["Racename"],
        "stats" => ["VIT" => $row["VIT"], "FOR" => $row["FOR"], 
                    "AGI" => $row["AGI"], "INT" => $row["INT"],
                    "VOL" => $row["VOL"], "TEM" => $row["TEM"],
                    "SAG" => $row["SAG"]
                  ],
        "armor" => $row["Armor"],
        "def" => ["DF" => $row["DF"], "DE" => $row["DE"], 
                  "RB" => $row["RB"], "RG" => $row["RG"],
                  "RI" => $row["RI"], "RS" => $row["RS"],
                  "Tox" => $row["Tox"]
                  ],
        "buffs" => $row["Buffs"],
        "extra" => $row["Extra"]   
      ];
      array_push($races, $newRace);      
    }

    $_SESSION['races'] = json_encode($races);
    $_SESSION['error'] = "";
  } else {
    $_SESSION['error'] = "Error: Failed to get the races from the server";
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
      <!-- <div class="col s12 m1"></div> -->
      <?php echo $_SESSION['error']; ?>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player1">Player 1</h5>
            <p class="center class1"> </p>
            <p class="center race1"> </p>
            <div class="card">
              <div class="card-content">
                <span class="card-title grey-text text-darken-4 center valign center-block lvl1">LVL</span>
                <p>
                  <table class="highlight">
                    <thead>
                      <tr>
                          <th data-field="stat">Stat</th>
                          <th data-field="statbase">Base</th>
                          <th data-field="statbuff">Buff</th>
                          <th data-field="stattotal">Total</th>
                      </tr>
                    </thead>

                    <tbody class="boldcol p1 center">
                      <tr>
                        <td>VIT</td>
                        <td class="vitBase">1</td>
                        <td class="vitBonus">1</td>
                        <td class="vitTotal">1</td>
                      </tr>
                      <tr>
                        <td>FOR</td>
                        <td class="forBase">1</td>
                        <td class="forBonus">1</td>
                        <td class="forTotal">1</td>
                      </tr>
                      <tr>
                        <td>AGI</td>
                        <td class="agiBase">1</td>
                        <td class="agiBonus">1</td>
                        <td class="agiTotal">1</td>
                      </tr>
                      <tr>
                        <td>INT</td>
                        <td class="intBase">1</td>
                        <td class="intBonus">1</td>
                        <td class="intTotal">1</td>
                      </tr>
                      <tr>
                        <td>VOL</td>
                        <td class="volBase">1</td>
                        <td class="volBonus">1</td>
                        <td class="volTotal">1</td>
                      </tr>
                      <tr>
                        <td>TEM</td>
                        <td class="temBase">1</td>
                        <td class="temBonus">1</td>
                        <td class="temTotal">1</td>
                      </tr>
                      <tr>
                        <td>SAG</td>
                        <td class="sagBase">1</td>
                        <td class="sagBonus">1</td>
                        <td class="sagTotal">1</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player2">Player 2</h5>
            <p class="center class2"> </p>
            <p class="center race2"> </p>
            <div class="card">
              <div class="card-content">
                <span class="card-title grey-text text-darken-4 center valign center-block lvl1">LVL</span>
                <p>
                  <table class="highlight">
                    <thead>
                      <tr>
                          <th data-field="stat">Stat</th>
                          <th data-field="statbase">Base</th>
                          <th data-field="statbuff">Buff</th>
                          <th data-field="stattotal">Total</th>
                      </tr>
                    </thead>

                    <tbody class="boldcol p2 center">
                      <tr>
                        <td>VIT</td>
                        <td class="vitBase">1</td>
                        <td class="vitBonus">1</td>
                        <td class="vitTotal">1</td>
                      </tr>
                      <tr>
                        <td>FOR</td>
                        <td class="forBase">1</td>
                        <td class="forBonus">1</td>
                        <td class="forTotal">1</td>
                      </tr>
                      <tr>
                        <td>AGI</td>
                        <td class="agiBase">1</td>
                        <td class="agiBonus">1</td>
                        <td class="agiTotal">1</td>
                      </tr>
                      <tr>
                        <td>INT</td>
                        <td class="intBase">1</td>
                        <td class="intBonus">1</td>
                        <td class="intTotal">1</td>
                      </tr>
                      <tr>
                        <td>VOL</td>
                        <td class="volBase">1</td>
                        <td class="volBonus">1</td>
                        <td class="volTotal">1</td>
                      </tr>
                      <tr>
                        <td>TEM</td>
                        <td class="temBase">1</td>
                        <td class="temBonus">1</td>
                        <td class="temTotal">1</td>
                      </tr>
                      <tr>
                        <td>SAG</td>
                        <td class="sagBase">1</td>
                        <td class="sagBonus">1</td>
                        <td class="sagTotal">1</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player3">Player 3</h5>
            <p class="center class3"> </p>
            <p class="center race3"> </p>
            <div class="card">
              <div class="card-content">
                <span class="card-title grey-text text-darken-4 center valign center-block lvl1">LVL</span>
                <p>
                  <table class="highlight">
                    <thead>
                      <tr>
                          <th data-field="stat">Stat</th>
                          <th data-field="statbase">Base</th>
                          <th data-field="statbuff">Buff</th>
                          <th data-field="stattotal">Total</th>
                      </tr>
                    </thead>

                    <tbody class="boldcol p3 center">
                      <tr>
                        <td>VIT</td>
                        <td class="vitBase">1</td>
                        <td class="vitBonus">1</td>
                        <td class="vitTotal">1</td>
                      </tr>
                      <tr>
                        <td>FOR</td>
                        <td class="forBase">1</td>
                        <td class="forBonus">1</td>
                        <td class="forTotal">1</td>
                      </tr>
                      <tr>
                        <td>AGI</td>
                        <td class="agiBase">1</td>
                        <td class="agiBonus">1</td>
                        <td class="agiTotal">1</td>
                      </tr>
                      <tr>
                        <td>INT</td>
                        <td class="intBase">1</td>
                        <td class="intBonus">1</td>
                        <td class="intTotal">1</td>
                      </tr>
                      <tr>
                        <td>VOL</td>
                        <td class="volBase">1</td>
                        <td class="volBonus">1</td>
                        <td class="volTotal">1</td>
                      </tr>
                      <tr>
                        <td>TEM</td>
                        <td class="temBase">1</td>
                        <td class="temBonus">1</td>
                        <td class="temTotal">1</td>
                      </tr>
                      <tr>
                        <td>SAG</td>
                        <td class="sagBase">1</td>
                        <td class="sagBonus">1</td>
                        <td class="sagTotal">1</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player4">Player 4</h5>
            <p class="center class4"> </p>
            <p class="center race4"> </p>
            <div class="card">
              <div class="card-content">
                <span class="card-title grey-text text-darken-4 center valign center-block lvl1">LVL</span>
                <p>
                  <table class="highlight">
                    <thead>
                      <tr>
                          <th data-field="stat">Stat</th>
                          <th data-field="statbase">Base</th>
                          <th data-field="statbuff">Buff</th>
                          <th data-field="stattotal">Total</th>
                      </tr>
                    </thead>

                    <tbody class="boldcol p4 center">
                      <tr>
                        <td>VIT</td>
                        <td class="vitBase">1</td>
                        <td class="vitBonus">1</td>
                        <td class="vitTotal">1</td>
                      </tr>
                      <tr>
                        <td>FOR</td>
                        <td class="forBase">1</td>
                        <td class="forBonus">1</td>
                        <td class="forTotal">1</td>
                      </tr>
                      <tr>
                        <td>AGI</td>
                        <td class="agiBase">1</td>
                        <td class="agiBonus">1</td>
                        <td class="agiTotal">1</td>
                      </tr>
                      <tr>
                        <td>INT</td>
                        <td class="intBase">1</td>
                        <td class="intBonus">1</td>
                        <td class="intTotal">1</td>
                      </tr>
                      <tr>
                        <td>VOL</td>
                        <td class="volBase">1</td>
                        <td class="volBonus">1</td>
                        <td class="volTotal">1</td>
                      </tr>
                      <tr>
                        <td>TEM</td>
                        <td class="temBase">1</td>
                        <td class="temBonus">1</td>
                        <td class="temTotal">1</td>
                      </tr>
                      <tr>
                        <td>SAG</td>
                        <td class="sagBase">1</td>
                        <td class="sagBonus">1</td>
                        <td class="sagTotal">1</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col s12 m2">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center player5">Player 5</h5>
            <p class="center class5"> </p>
            <p class="center race5"> </p>
            <div class="card">
              <div class="card-content">
                <span class="card-title grey-text text-darken-4 center valign center-block lvl1">LVL</span>
                <p>
                  <table class="highlight">
                    <thead>
                      <tr>
                          <th data-field="stat">Stat</th>
                          <th data-field="statbase">Base</th>
                          <th data-field="statbuff">Buff</th>
                          <th data-field="stattotal">Total</th>
                      </tr>
                    </thead>

                    <tbody class="boldcol p5 center">
                      <tr>
                        <td>VIT</td>
                        <td class="vitBase">1</td>
                        <td class="vitBonus">1</td>
                        <td class="vitTotal">1</td>
                      </tr>
                      <tr>
                        <td>FOR</td>
                        <td class="forBase">1</td>
                        <td class="forBonus">1</td>
                        <td class="forTotal">1</td>
                      </tr>
                      <tr>
                        <td>AGI</td>
                        <td class="agiBase">1</td>
                        <td class="agiBonus">1</td>
                        <td class="agiTotal">1</td>
                      </tr>
                      <tr>
                        <td>INT</td>
                        <td class="intBase">1</td>
                        <td class="intBonus">1</td>
                        <td class="intTotal">1</td>
                      </tr>
                      <tr>
                        <td>VOL</td>
                        <td class="volBase">1</td>
                        <td class="volBonus">1</td>
                        <td class="volTotal">1</td>
                      </tr>
                      <tr>
                        <td>TEM</td>
                        <td class="temBase">1</td>
                        <td class="temBonus">1</td>
                        <td class="temTotal">1</td>
                      </tr>
                      <tr>
                        <td>SAG</td>
                        <td class="sagBase">1</td>
                        <td class="sagBonus">1</td>
                        <td class="sagTotal">1</td>
                      </tr>
                    </tbody>
                  </table>
                </p>
              </div>
            </div>
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
    var races = <?php echo $_SESSION['races']; ?>;
    //var players = JSON.parse(JSONplayers);

    // For every player, set its data
    for (var i = 0; i < players.length; i++) {
      var tempI = i + 1;
      $(".player" + tempI).html(players[i].name);
      $(".class" + tempI).html(players[i].class);
      $(".race" + tempI).html(players[i].race);
      $(".lvl" + tempI).html("LVL " + players[i].level);
      $(".p" + tempI + " > tr > .vitBase").html(parseInt(players[i].stats.VIT) + parseInt(getBaseStats(players, i, 'VIT')));
      $(".p" + tempI + " > tr > .forBase").html(parseInt(players[i].stats.FOR) + parseInt(getBaseStats(players, i, 'FOR')));
      $(".p" + tempI + " > tr > .agiBase").html(parseInt(players[i].stats.AGI) + parseInt(getBaseStats(players, i, 'AGI')));
      $(".p" + tempI + " > tr > .intBase").html(parseInt(players[i].stats.INT) + parseInt(getBaseStats(players, i, 'INT')));
      $(".p" + tempI + " > tr > .volBase").html(parseInt(players[i].stats.VOL) + parseInt(getBaseStats(players, i, 'VOL')));
      $(".p" + tempI + " > tr > .temBase").html(parseInt(players[i].stats.TEM) + parseInt(getBaseStats(players, i, 'TEM')));
      $(".p" + tempI + " > tr > .sagBase").html(parseInt(players[i].stats.SAG) + parseInt(getBaseStats(players, i, 'SAG')));

      $(".p" + tempI + " > tr > .vitBonus").html(parseInt(getBonusStats(players, i, 'VIT')));
      $(".p" + tempI + " > tr > .forBonus").html(parseInt(getBonusStats(players, i, 'FOR')));
      $(".p" + tempI + " > tr > .agiBonus").html(parseInt(getBonusStats(players, i, 'AGI')));
      $(".p" + tempI + " > tr > .intBonus").html(parseInt(getBonusStats(players, i, 'INT')));
      $(".p" + tempI + " > tr > .volBonus").html(parseInt(getBonusStats(players, i, 'VOL')));
      $(".p" + tempI + " > tr > .temBonus").html(parseInt(getBonusStats(players, i, 'TEM')));
      $(".p" + tempI + " > tr > .sagBonus").html(parseInt(getBonusStats(players, i, 'SAG')));

      $(".p" + tempI + " > tr > .vitTotal").html(parseInt(getTotalStats(players, i, 'VIT')));
      $(".p" + tempI + " > tr > .forTotal").html(parseInt(getTotalStats(players, i, 'FOR')));
      $(".p" + tempI + " > tr > .agiTotal").html(parseInt(getTotalStats(players, i, 'AGI')));
      $(".p" + tempI + " > tr > .intTotal").html(parseInt(getTotalStats(players, i, 'INT')));
      $(".p" + tempI + " > tr > .volTotal").html(parseInt(getTotalStats(players, i, 'VOL')));
      $(".p" + tempI + " > tr > .temTotal").html(parseInt(getTotalStats(players, i, 'TEM')));
      $(".p" + tempI + " > tr > .sagTotal").html(parseInt(getTotalStats(players, i, 'SAG')));

    }
   
  </script>

  </body>
</html>

<!-- Closing PHP -->
<?php  ?>  