<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

include "dbConnect.php";
$data = array();
$query = $db->query("SELECT * FROM volatile");
if($query->num_rows > 0){
    while($row = $query->fetch_assoc()){
        $data[] = $row;
    }
}

echo json_encode($data);
echo mysqli_error($db);
?>