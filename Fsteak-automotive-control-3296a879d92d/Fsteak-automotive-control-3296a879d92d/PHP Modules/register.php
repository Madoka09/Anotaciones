<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); //Cache suficiente para un dia
}

//cabeceras para Access-Control son recibidas durante el request de OPTIONS

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

require "dbConnect.php";

$data = file_get_contents("php://input");

//Recibir datos de Ionic
if (isset($data)) {
    $request = json_decode($data);
    $fullname = $request->fullname;
    $charge = $request->charge;
    $username = $request->username;
    $password = $request->password;
    $passwordVerify = $request->passwordVerify;

}
if ($password === $passwordVerify) {
    //Crear Hash de la Contraseña
    $hash = password_hash($password, PASSWORD_BCRYPT);


//Buscar si hay un usuario igual
    $lookforUser = "SELECT * FROM users WHERE email = '$username'";
    $searchUser = $db->query($lookforUser);
    $count = mysqli_num_rows($searchUser);


    if ($count == 1) {
        $response = "Existente";
    } else {
    //Insertar Usuario en caso de que no exista
        $sql = "INSERT INTO users (email, password, name, role) VALUES ('$username', '$hash', '$fullname', '$charge')";

        if ($db->query($sql) === true) {
            $response = "Registro Exitoso";
        }

    }

} else {
    $response = "mismatch";
}
echo json_encode($response);

?>