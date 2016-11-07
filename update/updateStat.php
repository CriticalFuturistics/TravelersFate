<?php

$host="sql.criticalfuturistics.com";// Host name 
$dbusername="critical58585"; 		// Database username 
$dbpassword="travelers"; 			// Database password 
$dbname="critical58585"; 			// Database name 

$stat = $_POST['stat'];		
$value = $_POST['value'];
$playerID = $_POST['playerID'];

$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

$query = "UPDATE players SET ". $stat ." = ". $value ." WHERE ID = ". $playerID;

if (mysqli_query($con, $query)) {
	// Nothing
	echo "Value updated correctly";

} else {	
	echo "Error: " . $query . "<br>" . mysqli_error($con);
}

mysqli_close($con);

?>

