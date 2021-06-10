//登陆页面js
var checkbox1 = document.querySelector('[ type="checkbox"]')
var btn = document.querySelector('button')
var email1 = document.querySelector('.email')
var pass1 = document.querySelector('.pwd')
var qr = document.querySelector('.qr')

// var user1 = document.querySelector()
var search1 = location.search
//
// checkbox1.onclick = function () {
//   // console.log(2222)
//   if (checkbox1.checked) {
//     btn.disabled = false
//   } else {
//     btn.disabled = true
//   }
// }


$('button').click(function () {
  var e1 = email1.value
  var p1 = pass1.value

  if(!qr.checked){
    alert('请勾选协议');
    return;
  }
  ajax({
    url: '../php/login.php',
    data: `email=${e1}&password=${p1}`,
    success: function (res) {
      // console.log(dt);
      var res = JSON.parse(res);
      console.log(res);
      if (res.success) {
        //用setCookie保存账号
        setCookie('email', e1)
        if (search1) {
          var url1 = search1.split("=")[1]
          location.href = url1
        } else {

          location.href = './list.html'
        }
      } else {
        // console.log(dt)
        alert(res.msg)
      }
    }
  })
})