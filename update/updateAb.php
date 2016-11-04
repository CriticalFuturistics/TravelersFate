<?php
//ob_start();
//session_start();

$host="sql.criticalfuturistics.com";// Host name 
$dbusername="critical58585"; 		// Database username 
$dbpassword="travelers"; 			// Database password 
$dbname="critical58585"; 			// Database name 

$players = json_decode($_POST['players']);

$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

for ($i=0; $i < count($players); $i++) { 

	$playerID = array_values($players)[$i]->ID;

	$abilities = json_encode(array_values($players)[$i]->abilities->ab1);
	echo $abilities;
	/*
	$query = "UPDATE players SET abilities = ". $abilities ." WHERE ID = ". $playerID;
	
	if (mysqli_query($con, $query)) {
		// Nothing
		echo " Value updated correctly";

	} else {	
		echo "Error: " . $query . "<br>" . mysqli_error($con);
	}*/
}
	

mysqli_close($con);

?>

