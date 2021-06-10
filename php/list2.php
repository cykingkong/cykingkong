<?php
include "./common.php";
$c = $_GET['chaxun'];

$sql = "select * from `goods1` where names like '%${c}%'";

$result = mysqli_query($link, $sql);

$arr = [];

while ($row = mysqli_fetch_assoc($result)) {
  array_push($arr, $row);
}
echo json_encode($arr);
mysqli_close($link);
