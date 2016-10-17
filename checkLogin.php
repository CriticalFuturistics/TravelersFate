<?php
session_start();

$host="sql.criticalfuturistics.com"; // Host name 
$dbusername="critical58585"; // Database username 
$dbpassword="travelers"; // Database password 

$dbname="critical58585"; 	// Database name 
$tbl_name="users"; 	// Table name

$userForm = htmlSpecialChars($_POST['User']);		// Login Username
$passForm = htmlSpecialChars($_POST['Password']);	// Login Password

// Create connection
$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully <br>";

$query = "SELECT * FROM users WHERE username = '". $userForm ."' AND password = '". $passForm ."'" ;

$result = mysqli_query($con, $query);

// Test failure in the result
if (!$result) echo mysql_error(); 		

if (mysqli_num_rows($result) == 1) {
	//$_SESSION['user'] = $userForm;
	//$row = mysqli_fetch_assoc($result);
	$_SESSION['authorized'] = 1;
	$_SESSION['user'] = $userForm;
	if (strcmp('admin', $userForm) == 0) {
		header("location:cp.php");
	} else header("location:index.php");
	
} else {
	// mysqli_close($con); 	Is this needed?
	header("location:login.php?err=Wrong Username and/or Password");
}


?>

