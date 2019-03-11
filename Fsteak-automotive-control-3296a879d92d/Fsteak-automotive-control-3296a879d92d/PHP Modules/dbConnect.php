<?php 
require("C:\AppServ\www\dbConfigInventario.php");
$db = mysqli_connect(HOST, USER, PASS, DB);
if (!$db) {
    die("Error en la conexion" . mysql_connect_error());
}
?>