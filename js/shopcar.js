//购物车js
var lingbtn = document.querySelector('.lingbtn')
var cartList = localStorage.getItem("cartList")
var shopcarbx = document.querySelector('.shopcar-bx')
var car1 = document.querySelector('.car1')
var topa = document.querySelector('.top-a')
var email = getCookie("email")
console.log(email)

//cartList = eval('(' + cartList + ')')
// console.log(email, cartList.length)
if (email) {
  topa.innerHTML = "用户：" + email
} else {
  alert("尚未登陆，请登录")
  var url = location.href
  location.href = './login.html?newUrl=' + url
}
if (cartList.length > 0) {
  cartList = eval('(' + cartList + ')')
  show()
}

function show() {

  if (cartList.length > 0) {
    var bool = cartList.every(item => {
      // console.log(item.sele)

      return item.sele == 1
    })
    var str2 = `
     <div class="ling">
        <div class="leftling fl">
          <i class="w-icon-coupon coupon-coupon-red" style="margin:9px 17px 0 12px;" data-reactid=".2.0.0.1.0.0.0"></i>
          <span class="shopcarling">购物车可领优惠券</span>

        </div>
        <div class="lingbtn fr">领券</div>
      </div>
       <div class="car-tt">
       
          <ul class="car-ul ">
            <li class="car-li c-li1"><input type="checkbox" name="quan" ${bool ? "checked" : ''} class="quan">全选</li>
            <li class="car-li c-li2">商品信息</li>
            <li class="car-li c-li3">单价</li>
            <li class="car-li c-li4">数量</li>
            <li class="car-li c-li5">小记</li>
            <li class="car-li c-li6">操作</li>
          </ul>
        </div>
        `
    // console.log(cartList)

    cartList.forEach(item => {
      str2 += `
      
      <div class="shop-a">
            <ul>
              <li class="shop-li s-li1"><input type="checkbox" name="xuan" class="xuan" ${item.sele == 1 ? "checked" : ''} data-id=${item.id}><img
                  src="${item.tu1}">
              </li>
              <li class="shop-li s-li2">${item.names} </li>
              <li class="shop-li s-li3">¥<span class="newprice">${item.price}</span></li>
              <li class="shop-li s-li4"><button class="btn" ${item.number <= 1 ? "disabled" : ''} data-id=${item.id}>-</button><button>${item.number}</button><button ${item.cart_number >= item.goods_number ? "disabled" : ''} data-id=${item.id}>+</button></li>
              <li class="shop-li s-li5">¥<span class="xj">${(item.price * item.number).toFixed(2)}</span></li>
              <li class="shop-li s-li6"><button data-id=${item.id}>删除</button></li>
            </ul>
            <div class="clear"></div>
          </div>
              
      `
    })
    str2 += `
       <!-- 购物车底部按钮 -->
        <div class="car-bottom">
          <div class="car-a">
            <ul>
       
              <li class="bottom-li li-b3">合计：¥<span>${(total()[1]).toFixed(2)}</span></li>
              <li class="bottom-li li-b4">应付：¥<span>${(total()[1]).toFixed(2)}</span></li>
               <li class="bottom-li"><button>清空购物车</button> </li>
                      <li class="bottom-li"><button>结算</button> </li>
            </ul>
            <div class="clear"></div>
          </div>
        </div>
        `
    // console.log(car1.innerHTML)
    shopcarbx.innerHTML = str2
  } else {
    var str = `
      <div class="ling">
        <div class="leftling fl">
          <i class="w-icon-coupon coupon-coupon-red" style="margin:9px 17px 0 12px;" data-reactid=".2.0.0.1.0.0.0"></i>
          <span class="shopcarling">购物车可领优惠券</span>

        </div>
        <div class="lingbtn fr">领券</div>
      </div>
     <div class="kongcar ">

        <div class="k-c ">
          <img src="../wyyxjpg/kongcar.jpeg" alt="">
          <span>购物车啥也没有</span>
          <div class="herflist">快去选购吧</div>
        </div v>
      </div>
    `

    shopcarbx.innerHTML = str
    //领劵按钮
    //跳转列表页
    $('.herflist').click(function () {
      location.href = "./list.html"
    })
  }
}
$('.lingbtn').click(function () {
  alert("抱歉券被领完")
})

shopcarbx.onclick = function (e) {
  //事件对象兼容
  var e = e || window.event
  //目标对象兼容
  var target = e.target || e.srcElement
  if (target.innerHTML == '+') {
    //获取当前操作对的id属性值
    var id = target.getAttribute("data-id")
    //操作cartList4中指定的数据
    cartList.forEach(item => {
      //判断是否为当前要操作的商品
      if (item.id == id) {
        item.number++
      }
    })
    //把修改完毕的cartList4重新存储在localStorage中
    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
  if (target.innerHTML == '-') {
    //获取id
    var id = target.getAttribute("data-id")
    //操作cartList4中指定的数据
    cartList.forEach(item => {
      // console.log(item)
      //判断是否为当前要操作的商品
      if (item.id == id) {
        item.number--
      }
    })
    //把修改完毕的cartList4重新存储在localStorage中
    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
  if (target.innerHTML == "删除") {
    var id = target.getAttribute("data-id")
    cartList = cartList.filter(item => {
      return item.id != id
    })

    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
  if (target.name == "quan") {
    //遍历所有商品
    cartList.forEach(item => {
      //判断当前全选框是否被选中
      if (target.checked) {
        item.sele = 1
      } else {
        item.sele = 0
      }
      localStorage.setItem("cartList", JSON.stringify(cartList))
      show()
    })
  }

  if (target.name == "xuan") {
    //获取当前选中框对象的id属性
    var id = target.getAttribute('data-id')
    //遍历数组元素
    //遍历所有商品
    cartList.forEach(item => {
      //判断是否为当前要操作的商品
      if (item.id == id) {
        //判断当前商品中sele是否等于1
        if (item.sele == 1) {
          item.sele = 0
        } else {
          item.sele = 1
        }
      }
    })
    //把修改完毕的cartList4重新存储在localStorage中
    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
  if (target.innerHTML == "结算") {
    alert(`一共消费${total()[1]}元`);
    cartList = cartList.filter(item => {
      return item.sele != 1
    })
    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
  if (target.innerHTML == "清空购物车") {
    cartList = []
    //把修改完毕的cartList4重新存储在localStorage中
    localStorage.setItem("cartList", JSON.stringify(cartList))
    show()
  }
}
//计算所选商品价格和数量
function total() {
  var nums = 0 //所选商品数量
  var prices = 0 //所选商品价格
  //遍历所有商品
  cartList.forEach(item => {
    //判断当前商品是否被选中
    if (item.sele == 1) {
      nums += item.number
      prices += parseFloat(item.price) * parseInt(item.number)
    }
  })
  return [nums, prices]
}