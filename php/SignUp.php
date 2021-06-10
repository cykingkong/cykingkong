<?php
include "./common.php";


$e = $_GET['email'] ?? null;
$p = $_GET['password'] ?? null;


if (!$e) {
   response([], "请输入邮箱", 10001, false);
}

if (!$p) {
    response([], "请输入密码", 10002, false);
}

$sql = "SELECT `email` FROM `user` WHERE `email` = '{$e}'";

$result = mysqli_query($link, $sql);

if ($result && $result->fetch_assoc()) {
   response([], "账号已存在", 10007, false);
}


//编写sql语句
$sql = "insert into user (email,password) values ('$e','$p')";
//执行sql语句
$result = mysqli_query($link, $sql);
if ($result) {
   response([], "注册成功");
} else {
   response([], "注册失败", 10003, false);
}
mysqli_close($link);
