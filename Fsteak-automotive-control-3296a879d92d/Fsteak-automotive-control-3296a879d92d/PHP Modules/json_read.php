<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

include "dbConnect.php";
$dataEntry = array();
$queryEntry = $db->query("SELECT productos.nombre, productos.id, productos.descripcion, productos.codigo, entradas.provedor, productos.pasillo, productos.rack, productos.nivel, MAX(entradas.codigof) as codigof, SUM(entradas.cantidad) as cantidad, MAX(entradas.created_at) as created_at FROM productos LEFT JOIN entradas ON productos.id = entradas.producto_id GROUP BY productos.nombre");
if($queryEntry->num_rows > 0){
    while($rowEntry = $queryEntry->fetch_assoc()){
        $dataEntry[] = $rowEntry;
    }
}

$departDepart = array();
$queryDepart = $db->query("SELECT productos.nombre, productos.codigo, SUM(salidas.cantidad) as Total FROM productos INNER JOIN salidas ON productos.id = salidas.producto_id GROUP BY productos.nombre");
if($queryDepart->num_rows > 0){
    while($rowDepart = $queryDepart->fetch_assoc()){
        $dataDepart[] = $rowDepart;
    }
}

echo json_encode($dataEntry);
//echo json_encode($dataDepart);
echo mysqli_error($db);

?>