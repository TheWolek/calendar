<?php
$data = json_decode(file_get_contents('php://input'), true);
// var_dump(date("Y-m-d h:i:s", strtotime($data["FullDate"]))); 
$date = date("Y-m-d h:i:s", strtotime($data["FullDate"]));

require("query.php");
$sql = "insert into terms (date,name,proc,details) values('".$date."','".$data["data"]."','".$data["proc"]."','".$data["det"]."')";
if($result = DB_query($sql)) {
    $sql = "select id from terms where date='".$date."' and name like '".$data["data"]."'";
    $result = DB_query($sql);
    while($row = $result->fetch_assoc()) {
        echo json_encode(["status" => true, "CID" => $row["id"]]);
    }
} else {
    echo json_encode(["status" => false]);
}

//echo "done";
?>