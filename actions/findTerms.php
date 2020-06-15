<?php 
require("query.php");
$date = $_POST["date"];

$sql = "select id, date from terms where date like CONCAT('".$date."', '%')";
if($result = DB_query($sql)) {
    $arr = [];
    while($row = $result->fetch_assoc()) {
        array_push($arr,["cid" => $row["id"], "date" => $row["date"]]);
    }
}

if(empty($arr)) {
    echo json_encode(["status" => false]);
} else {
    echo json_encode(["status" => true, "data" => $arr]);
}
?>