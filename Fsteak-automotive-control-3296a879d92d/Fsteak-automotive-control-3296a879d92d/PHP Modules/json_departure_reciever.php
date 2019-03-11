<?php
if(isset($_SERVER['HTTP_ORIGIN'])){
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max_Age: 86400");
}

//MAS headers para el correcto funcionamiento del script
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

    $id = $request->id;
    $nombre = $request->name;
    $codigo = $request->code;
    $cantidad = $request->qty;

    $temporal =  [];

    array_push($temporal, $nombre, $codigo, $cantidad, $id);

    $tempName = (array_values($temporal)[0]);
    $tempCode = (array_values($temporal)[1]);
    $tempQty = (array_values($temporal)[2]);
    $tempId = (array_values($temporal)[3]);
    $cantidad = intval($tempQty);

    $joinedValues = $tempName.",".$tempCode.",".$tempQty.",".$tempId;

    $insertOnTable = ("INSERT INTO volatile (temporal) VALUES ('$joinedValues')");

    if($db->query($insertOnTable) === TRUE){
        $response = "success";
    } else {
        $response = "Error con la base de datos".$insertOnTable.$db->error;
    }


} else{
    echo "FATAL...";
}

echo json_encode($response);

$db->close();

?>