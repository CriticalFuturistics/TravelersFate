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

	echo json_encode($hp);

	$query = "UPDATE players SET hp = '". json_encode($hp) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);	

	$query = "UPDATE players SET mana = '". json_encode($mana) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);

	$query = "UPDATE players SET xp = '". json_encode($xp) ."' WHERE ID = ". $playerID;
	doQuery($con, $query);	
}
	
function doQuery($con, $query){
	if (mysqli_query($con, $query)) { echo " Value updated correctly"; }
	else {	echo "Error: " . $query . "<br>" . mysqli_error($con);	}
}

mysqli_close($con);

?>

