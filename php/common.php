<?php
header("content-type:text/html;charset=utf-8");

$link = mysqli_connect("127.0.0.1", "root", "Cy2021!@", "chenyan");
if (!$link) {
  echo "连接数据库失败";
  exit;
}

mysqli_set_charset($link, "utf8");


function response($data, $msg = "", $code = 200, $success = true)
{
  $res = ['code' => $code, 'msg' => $msg, 'success' => $success, 'data' => $data];
  echo json_encode($res);
  exit;
}
