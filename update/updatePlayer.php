<?php

$host="sql.criticalfuturistics.com";// Host name 
$dbusername="critical58585"; 		// Database username 
$dbpassword="travelers"; 			// Database password 
$dbname="critical58585"; 			// Database name 

$players = json_decode($_POST['players']);

$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

for ($i=0; $i < count($players); $i++) { 

	$playerID = array_values($players)[$i]->ID;
	$hp = array_values($players)[$i]->HP;
	$mana = array_values($players)[$i]->Mana;
	$xp = array_values($players)[$i]->XP;
	$stats = array_values($players)[$i]->stats;
	$abilities = array_values($players)[$i]->abilities;
	$inventory = array_values($players)[$i]->inventory;
	$equip = array_values($players)[$i]->equip;

	$abs = [$abilities->ab1, 
			$abilities->ab2, 
			$abilities->ab3, 
			$abilities->ab4, 
			$abilities->ab5,
			$abilities->ab6
			];
	
	$query = 'UPDATE players SET VIT = '. json_encode($stats->VIT) .' WHERE ID = '. $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET FORZ = ". json_encode($stats->FORZ) ." WHERE ID = ". $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET AGI = ". json_encode($stats->AGI) ." WHERE ID = ". $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET INTE = ". json_encode($stats->INTE) ." WHERE ID = ". $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET VOL = ". json_encode($stats->VOL) ." WHERE ID = ". $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET TEM = ". json_encode($stats->TEM) ." WHERE ID = ". $playerID;
	doQuery($con, $query);
	$query = "UPDATE players SET SAG = ". json_encode($stats->SAG) ." WHERE ID = ". $playerID;
	doQuery($con, $query);


	$query = "UPDATE players SET abilities = '". json_encode($abs) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);	

	$query = "UPDATE players SET hp = '". json_encode($hp) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);	

	$query = "UPDATE players SET mana = '". json_encode($mana) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);

	$query = "UPDATE players SET xp = '". json_encode($xp) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);

	$query = "UPDATE players SET equip = '". json_encode($equip) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);

	$query = "UPDATE players SET inventory = '". json_encode($inventory) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);
}
	
function doQuery($con, $query){
	if (mysqli_query($con, $query)) { echo "  Value updated correctly "; }
	else {	echo "Error: " . $query . " <br> " . mysqli_error($con);	}
}

mysqli_close($con);

?>

