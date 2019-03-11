<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

include "dbConnect.php";
$data = array();
$truncate = ("TRUNCATE TABLE volatile");
$query = $db->query($truncate);

echo json_encode($data);
echo mysqli_error($db);
?>