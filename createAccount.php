<?php
ob_start();
session_start();

$host="sql.criticalfuturistics.com"; // Host name 
$dbusername="critical58585"; 	// Database username 
$dbpassword="travelers"; 		// Database password 

$dbname="critical58585"; 		// Database name 
$tbl_name="users"; 				// Table name

$userForm = htmlSpecialChars($_POST['User']);		// Login Username
$passForm = htmlSpecialChars($_POST['Password']);	// Login Password

// Create connection
$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
//echo "Connected successfully <br>";

$query = "INSERT INTO users (username, password) VALUES ('". $userForm ."', '". $passForm . "')"; 

if (mysqli_query($con, $query)) {
    echo "New record created successfully";
    $_SESSION["user"] = $userForm;
    header("location:login.php?err=Login with your new account");
} else {
    echo "Error: " . $query . "<br>" . mysqli_error($con);
}

mysqli_close($con);


?>

