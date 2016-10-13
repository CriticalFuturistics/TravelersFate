<?php

session_start();

if ($_SESSION['authorized'] == 1) {
	$_SESSION['authorized'] = 0;
	$_SESSION['user'] = "";
	session_destroy();
	header("location:index.php");
} else {
	header("location:index.php");
}



?>