<?php
if(isset($_SERVER['HTTP_ORIGIN'])){
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); //Cache suficiente para un dia
}

//cabeceras para Access-Control son recibidas durante el request de OPTIONS

if($_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
    }
    
    if(isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

require "dbConnect.php";

$data = file_get_contents("php://input");

if(isset($data)){
    $request = json_decode($data);
    $username = $request->username;
    $password = $request->password;
    $charge = $request->charge;
}

$sql = "SELECT * FROM users WHERE email = '$username'";
$get_charge = "SELECT role FROM users WHERE email = '$username'";

$result = $db->query($sql);

$getCharge = $db->query($get_charge);

if($result->num_rows > 0){
    $row = $result->fetch_array(MYSQLI_ASSOC);
    $hash = $row['password'];
}

if($getCharge->num_rows > 0){
    $row_1 = $getCharge->fetch_array(MYSQLI_ASSOC);
    $charge = $row_1['role'];
}



if(password_verify($password, $hash)){
    $response = $charge;
} else {
    $response = "Error iniciando sesión";
}

echo json_encode($response);

$db->close();
?>