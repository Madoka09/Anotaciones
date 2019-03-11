<?php 
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header("Access-Control-Allow-Headers: content-type");
include_once "dbConnect.php";

$input = file_get_contents('php://input');
$data = json_decode($input, true);
$message = array();
switch ($data['action']) {
    //Insertar un item en la tabla Stock, en este caso un articulo
    case "insertItem":
        $nombre = $data['nombre'];
        $descripcion = $data['descripcion'];
        $codigo = $data['codigo'];
        $rack = $data['rack'];
        $pasillo = $data['pasillo'];
        $nivel = $data['nivel'];
        $fifo = $data['fifo'];
        $proveedor = $data['proveedor'];
        //realizar consulta y devolver respuesta
        $addItemQuery = mysqli_query($db, "INSERT INTO `productos` (`nombre`,`descripcion`,`codigo`, `cantidad`, `rack`,`pasillo`,`nivel`, `categoria_id`, `user_id`) VALUES ('$nombre', '$descripcion', '$codigo', '0', '$rack', '$pasillo', '$nivel', '3', '1')");
        
        //Obtener ID del producto entrante
        $checkQuery = mysqli_query($db, "SELECT id FROM productos WHERE nombre = '$nombre'");

        if($checkQuery){
            $newID = $checkQuery->fetch_object()->id;
        }

        /*
        //Insertar campos vacíos en entrada y salida para obtener un registro
        $insertDummyEntry = mysqli_query($db, "INSERT INTO `entradas` (`cantidad`, `codigof`, `provedor`, `producto_id`, `user_id`) VALUES (0, '$fifo', '$proveedor', '$newID', 1)");
*/
        if ($addItemQuery) {
            $message['status'] = "success";
        } else {
            $message['status'] = "error";
        }
        
        echo json_encode($message);
        break;

    case "insertProvider":
        $nombreProvedor = $data['proveedor'];

        $addProviderQuery = mysqli_query($db, "INSERT INTO providers (nombreProveedor) VALUES ('$nombreProvedor')");
        if($addProviderQuery){
            $message['status'] = "success";
        } else{
            $message['status'] = "error";
        }
        echo json_encode($message);
        break;
}
echo mysqli_error($db);
?>