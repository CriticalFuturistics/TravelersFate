<?php
ob_start();
session_start();

$host="sql.criticalfuturistics.com"; // Host name 
$dbusername="critical58585"; 	// Database username 
$dbpassword="travelers"; 		// Database password 

$dbname="critical58585"; 		// Database name 
$tbl_name="users"; 				// Table name

$userForm = htmlSpecialChars($_POST['User']);			// Login Username
$passForm = htmlSpecialChars($_POST['NewPassword']);	// Login Password

// Create connection
$con = mysqli_connect($host, $dbusername, $dbpassword, $dbname);

// Check connection
if (!$con) { die("Connection failed: " . mysqli_connect_error()); }

// Update the password
$query = "UPDATE users SET password = '". $passForm ."' WHERE username = '". $userForm ."' ";

if (mysqli_query($con, $query)) {
    echo "Record updated successfully";
    $_SESSION["user"] = $userForm;
    header("location:login.php?err=Login with your new password");
} else {
    echo "Error: " . $query . "<br>" . mysqli_error($con);
}

mysqli_close($con);


?>

