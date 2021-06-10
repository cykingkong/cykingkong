var email1 = document.querySelector('.email')
var pass1 = document.querySelector('.pwd')
var qr = document.querySelector('.qr')
$('.zhuce').click(function () {
  var e1 = email1.value
  var p1 = pass1.value

  if(!qr.checked){
    alert('请勾选协议');
    return;
  }
  ajax({
    url: '../php/SignUp.php',
    data: `email=${e1}&password=${p1}`,

    success: function (res) {
      var res = JSON.parse(res);
      console.log(res);

      if (res.success) {
        alert('注册成功，点击跳转登陆')
        location.href = './login.html'
      } else {
        alert(res.msg)
      }


    }

  })

});
$('.backlogin').click(function () {
  location.href='./login.html'
})