<?php

session_start();
$host="localhost"; 	// Host name 
$dbusername="root"; // Mysql username 
$dbpassword="root"; // Mysql password 

$dbname="materialdb"; 	// Database name 
$tbl_name="users"; 		// Table name 

// Create connection
$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);
$save = $data->save;

$query = "UPDATE users SET save = '". htmlSpecialChars($save) ."' WHERE user = '". htmlSpecialChars($_SESSION['user']) ."'";

$result = mysqli_query($con, $query);

// Test failure in the result
if (!$result) echo mysql_error(); 	

//mysqli_query($con, $query);
mysqli_close($con);
	
header("location:index.php");

?>