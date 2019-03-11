<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

include "dbConnect.php";
$departDepart = array();
$queryDepart = $db->query("SELECT productos.nombre, productos.codigo, coalesce(SUM(salidas.cantidad), 0) as Total FROM productos LEFT JOIN salidas ON productos.id = salidas.producto_id GROUP BY productos.nombre");
if($queryDepart->num_rows > 0){
    while($rowDepart = $queryDepart->fetch_assoc()){
        $dataDepart[] = $rowDepart;
    }
}

echo json_encode($dataDepart);
echo mysqli_error($db);

?>