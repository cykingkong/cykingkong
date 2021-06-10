<?php
include "./common.php";

$e = $_GET['email'] ?? null;
$p = $_GET['password'] ?? null;

//echo $e;
if (!$e) {
    response([], "请输入账号", 10008, false);
}
if (!$p) {
    response([], "请输入密码", 10009, false);
}
$sql = "select * from `user` where email='{$e}' and password='{$p}'";
$result = mysqli_query($link, $sql);

if (!$result) {
    response([], "账号或密码错误", 10009, false);
}


if ($row = mysqli_fetch_row($result)) {
    response([], "登陆成功");

} else {
    response([], "账号或密码错误");

}
mysqli_close($link);
