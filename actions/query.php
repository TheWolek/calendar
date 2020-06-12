<?php
function DB_query($sql)
{
    require("db.php");

    @$conn = new mysqli($DB_host,$DB_user,$DB_password,$DB_name);
    if($conn->connect_error) {
        die('Connection failed: '.$conn->connect_error);
    }

    $conn->query("set names 'utf-8'");
    $result = $conn->query($sql);
    $conn->close();
    return $result;
}
?>