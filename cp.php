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
				"ID" => $row['ID'],
				"name" => $row["name"],
				"class"=> $row["class"],
				"race" => $row["race"],
				"level" => $row["level"],
				"armor" => $row["armor"],
				"stats" => ["VIT" => $row["VIT"], "FORZ" => $row["FORZ"], 
										"AGI" => $row["AGI"], "INTE" => $row["INTE"],
										"VOL" => $row["VOL"], "TEM" => $row["TEM"],
										"SAG" => $row["SAG"]
									],
				"DF" => $row["DF"],
				"DE" => $row["DE"],
				"RB" => $row["RB"],
				"RC" => $row["RC"],
				"RI" => $row["RI"],
				"TOX" => $row["TOX"],
				"equip" => json_decode($row["equip"]),
				"inventory" => $row["inventory"], 
				"buffs" => $row["buffs"],
				"PT" => $row['PT'],
				"abilities" => $row['abilities'],
				"maxHP" => 0,
				"maxMana" => 0,
				"maxXP" => 100,
				"HP" => 0,
				"Mana" => 0,
				"XP" => 0,
			];
			array_push($players, $newPlayer);      
		}

		$_SESSION['players'] = json_encode($players);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the players from the server";
	}
	
	$sql = "SHOW COLUMNS FROM players";
	$result = mysqli_query($con,$sql);
	$_SESSION['playersColumns'] = [];
	$i = 1;
	while($row = mysqli_fetch_array($result)){
		$_SESSION['playersColumns'][$i] = $row['Field'];
		$i = $i + 1;
	}

	// -------------------------------------------------- //
	// Races
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
				"stats" => ["VIT" => $row["VIT"], "FORZ" => $row["FORZ"], 
										"AGI" => $row["AGI"], "INTE" => $row["INTE"],
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

	// -------------------------------------------------- //
	// Classes
	$query = "SELECT * FROM classes";
	$result = mysqli_query($con, $query);

	// Test failure in the result
	if (!$result) echo mysql_error();

	// Get the data
	if (mysqli_num_rows($result) > 0) {
		// Create empty array
		$classes = [];
		while($row = mysqli_fetch_assoc($result)) {                                                         
			// Add a new array with name, class and race to the players array
			$newClass = [
				"classname" => $row["Classname"],
				"stats" => ["VIT" => $row["VIT"], "FORZ" => $row["FORZ"], 
										"AGI" => $row["AGI"], "INTE" => $row["INTE"],
										"VOL" => $row["VOL"], "TEM" => $row["TEM"],
										"SAG" => $row["SAG"]
									],
				"abilities" => ["AB1" => $row["AB1"], 
												"AB2" => $row["AB2"], 
												"AB3" => $row["AB3"], 
												"AB4" => $row["AB4"],
												"AB5" => $row["AB5"], 
												"AB6" => $row["AB6"]
											],
				"extra" => $row["Extra"]   
			];
			array_push($classes, $newClass);      
		}

		$_SESSION['classes'] = json_encode($classes);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the classes from the server";
	}

	// -------------------------------------------------- //
	// Items
	$query = "SELECT * FROM items";
	$result = mysqli_query($con, $query);

	// Test failure in the result
	if (!$result) echo mysql_error();

	// Get the data
	if (mysqli_num_rows($result) > 0) {
		// Create empty array
		$items = [];
		while($row = mysqli_fetch_assoc($result)) {      
			// Add a new array with name, class and race to the players array
			$newItem = [
				"ID" => $row["ID"],
				"name" => $row["name"],
				"price" => $row["price"], 
				"weight" => $row["weight"], 
				"type" => $row["type"],
				"rarity" => $row["rarity"]
			];
			array_push($items, $newItem);      
		}

		$_SESSION['items'] = json_encode($items);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the items from the server";
	}

	// -------------------------------------------------- //

	// Buffs
	$query = "SELECT * FROM buffs";
	$result = mysqli_query($con, $query);
	if (!$result) echo mysql_error();
	if (mysqli_num_rows($result) > 0) {
		$buffs = [];
		while($row = mysqli_fetch_assoc($result)) {                                                         
			$newBuff = [
				"ID" => $row["ID"],
				"name" => $row["name"],
				"effect" => $row["effect"],
				"duration" => $row["duration"]
			];
			array_push($buffs, $newBuff);      
		}

		$_SESSION['buffs'] = json_encode($buffs);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the buffs/debuffs from the server";
	}

	// -------------------------------------------------- //

	// Weapons (Armi)
	$query = "SELECT * FROM armi";
	$result = mysqli_query($con, $query);

	// Test failure in the result
	if (!$result) echo mysql_error();

	// Get the data
	if (mysqli_num_rows($result) > 0) {
		// Create empty array
		$armi = [];
		while($row = mysqli_fetch_assoc($result)) {      
			// Add a new array with name, class and race to the players array
			$newArma = [
				"ID" => $row["ID"],
				"name" => $row["name"],
				"type" => $row["type"], 
				"fxDex" => $row["fxDex"], 
				"fx" => $row["fx"],
				"dmg" => $row["dmg"],
				"PA" => $row["PA"]
			];
			array_push($armi, $newArma);      
		}

		$_SESSION['armi'] = json_encode($armi);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the Weapons (Armi) from the server";
	}

	// -------------------------------------------------- //

	// Equip
	$query = "SELECT * FROM equip";
	$result = mysqli_query($con, $query);
	if (!$result) echo mysql_error();
	if (mysqli_num_rows($result) > 0) {
		$equip = [];
		while($row = mysqli_fetch_assoc($result)) {                                                         
			$newEquip = [
				"ID" => $row["ID"],
				"name" => $row["name"],
				"slot" => $row["slot"],
				"fxDex" => $row["fxDex"],
				"fx" => $row["fx"],
				"armor" => $row["armor"],
				"DF" => $row["DF"],
				"DE" => $row["DE"],
				"RB" => $row["RB"],
				"RS" => $row["RS"],
				"RC" => $row["RC"],
				"RI" => $row["RI"],
				"TOX" => $row["TOX"]
			];
			array_push($equip, $newEquip);      
		}

		$_SESSION['equip'] = json_encode($equip);
		$_SESSION['error'] = "";
	} else {
		$_SESSION['error'] = "Error: Failed to get the equipment from the server";
	}

	// -------------------------------------------------- //
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
		<title>Travelers' Fate</title>

		<!-- CSS  -->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
		<link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>

		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

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
				<div class="row players">
				<!-- <div class="col s12 m1"></div> -->
				<?php echo $_SESSION['error']; ?>

					<div class="col s12 m2 x1">
						<div class="icon-block">
							<h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
							<span class="playerData1">    </span>
							<span class="playerArmor1">   </span>
							<div class="card" style='overflow-x:scroll;overflow-y:hidden;width:100%;height:100px;padding-left:8px;margin-top:25px'>
								<div class="card-content buffs" style='width:300%;height:60px;'>
									
								</div>
							</div>
							<span class="playerEquip1"> 
								

							</span>
							<span class="playerInventory1">   </span>
						</div>
					</div>

					<div class="col s12 m2 x2">
						<div class="icon-block">
							<h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
							<span class="playerData2">    </span>
							<span class="playerArmor2">   </span>
							<div class="card" style='overflow-x:scroll;overflow-y:hidden;width:100%;height:100px;padding-left:8px;margin-top:25px'>
								<div class="card-content buffs" style='width:300%;height:60px;'>
									
								</div>
							</div>
							<span class="playerEquip2">   </span>
							<span class="playerInventory2">   </span>
						</div>
					</div>

					<div class="col s12 m2 x3">
						<div class="icon-block">
							<h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
							<span class="playerData3">    </span>
							<span class="playerArmor3">   </span>
							<div class="card" style='overflow-x:scroll;overflow-y:hidden;width:100%;height:100px;padding-left:8px;margin-top:25px'>
								<div class="card-content buffs" style='width:300%;height:60px;'>
									
								</div>
							</div>
							<span class="playerEquip3">   </span>
							<span class="playerInventory3">   </span>
						</div>
					</div>

					<div class="col s12 m2 x4">
						<div class="icon-block">
							<h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
							<span class="playerData4">    </span>
							<span class="playerArmor4">   </span>
							<div class="card" style='overflow-x:scroll;overflow-y:hidden;width:100%;height:100px;padding-left:8px;margin-top:25px'>
								<div class="card-content buffs" style='width:300%;height:60px;'>
									
								</div>
							</div>
							<span class="playerEquip4">   </span>
							<span class="playerInventory4">   </span>
						</div>
					</div>

					<div class="col s12 m2 x5">
						<div class="icon-block">
							<h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
							<span class="playerData5">    </span>
							<span class="playerArmor5">   </span>
							<div class="card" style='overflow-x:scroll;overflow-y:hidden;width:100%;height:100px;padding-left:8px;margin-top:25px'>
								<div class="card-content buffs" style='width:300%;height:60px;'>
									
								</div>
							</div>
							<span class="playerEquip5">   </span>
							<span class="playerInventory5">   </span>
						</div>
					</div>

				</div>

			</div>
			<br><br>

			<div class="section">

			</div>
		</div>

		<!-- Dialog Modal Structure -->
		<div id="doEquipItem" class="modal">
			<div class="modal-content">
				<h4>_</h4>
				<p class="changes">_</p>
			</div>
			<div class="modal-footer">
				<a href="#!" class=" modal-action waves-effect btn-flat" id="doEquip">Equipaggia</a>
				<a href="#!" class=" modal-action modal-close waves-effect btn-flat">Annulla</a>
			</div>
		</div>

		<!-- Dialog Modal Structure Equipped -->
		<div id="doUnequipItem" class="modal">
			<div class="modal-content">
				<h4>_</h4>
				<p class="changes">_</p>
			</div>
			<div class="modal-footer">
				<a href="#!" class="modal-action waves-effect btn-flat" id="doUnequip">Disequipaggia</a>
				<a href="#!" class="modal-action modal-close waves-effect btn-flat">Annulla</a>
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
		<script src="js/materialize.js"></script>
		<script src="js/init.js"></script>
		<script src="js/update.js"></script>
		<script src="js/sql.js"></script>

		<script>

			var players = <?php echo $_SESSION['players']; ?>;
			var races   = <?php echo $_SESSION['races']; ?>;
			var classes = <?php echo $_SESSION['classes']; ?>;
			var buffs   = <?php echo $_SESSION['buffs']; ?>;
			var playersColumns = <?php print_r(json_encode($_SESSION['playersColumns'])); ?>;
			var items = <?php echo $_SESSION['items']; ?>;
			var armi = <?php echo $_SESSION['armi']; ?>;
			var equip = <?php echo $_SESSION['equip']; ?>;

			setup();
			placePlayers();

			initialiseTooltips();

			updateLocal();
			updateFields();
		 
			// set of functions to be run when everything else has loaded
			finish();
		</script>
	</body>
</html>

<!-- Closing PHP -->
<?php  ?>  