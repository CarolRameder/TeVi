<?php
	session_start();
	define('SLASH',DIRECTORY_SEPARATOR);
	define('DIRECTOR_SITE', dirname(__FILE__));
	
	$controller = "CHome";
	$actiune= "viewHome";
	$parametri= "";
	
	include "app/controller/chome.php";
	include "app/model/mhome.php";
	include "app/model/mlogin.php";
	include "app/model/mBD.php";
	include "app/view/vhome.php";
	include "app/model/mchart.php";
	include_once "app/model/mMap.php";

/* comenturi */
 
	if(isset($_POST["actiune"])){
		 $actiune=$_POST["actiune"];
		 unset($_POST['actiune']);
	}
	
	
	$control = new CHome($actiune, $parametri);

	


?>