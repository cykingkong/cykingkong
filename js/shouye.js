//获取操作对象
var lis = Array.from(document.querySelectorAll(".tab-li"))
var tab = Array.from(document.querySelectorAll(".tab-1"))
var divTab = document.querySelector(".tab")
var email = getCookie("email")
// console.log(email)
var topa = document.querySelector('.top-a')
if (email) {
  topa.innerHTML = "用户：" + email
}
//console.log(lis)
//鼠标移入
lis.forEach(item => {

  item.onmouseenter = function () {
    // console.log(this.getAttribute('data-id'))
    var a = this.getAttribute('data-id') + '.' + 1
    // console.log(a)
    tab.forEach(function (item) {
      item.classList.add('dis-none')

    })
    tab.forEach(function (item) {
      //   console.log(item.getAttribute('data-id2'))
      if (a == item.getAttribute('data-id2')) {
        item.classList.remove('dis-none')

      }
    })
  }
})

//鼠标移出
lis.forEach(item => {

  item.onmouseleave = function () {
    // console.log(this.getAttribute('data-id'))
    var a = this.getAttribute('data-id') + '.' + 1
    // console.log(a)
    tab.forEach(function (item) {
      item.classList.add('dis-none')

    })


  }
})
var shopcar = document.querySelector('.shopcar')
//给购物车按钮添加点击事件   点击跳转到购物车页面
shopcar.onclick = function () {
  location.href = "./shopcar.html"
}
