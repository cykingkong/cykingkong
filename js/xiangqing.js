var shopcar = document.querySelector('.shopcar')
var shopxq = document.querySelector('.shopxq')
var search1 = location.search
var email = getCookie("email")
// console.log(email)
var topa = document.querySelector('.top-a')
if (email) {
  topa.innerHTML = "用户："

}
//判断当前地址栏中是否有参数,无参数跳转到列表页面
if (search1) {
  // console.log(111)
  var ar1 = search1.split("=");

  if (ar1[0] == '?id') {
    var id = ar1[1];
    (async function () {
      dt = await promiseAjax({
        url: '../php/xiangqing.php',
        data: 'id=' + id
      })
      dt = eval('(' + dt + ')')
      // console.log(dt)
      var str = `


    <div class="xq-bx">
      <div class="xq-sp">
        <!-- 商品详情图片介绍左边 -->
        <div class="xq-left fl">
          <div class="shop-img">
          <div class="mengban"></div>
            <img class="thumbImg ttu1"
              src=${dt.tu1}
             >
          </div>
          <div class="shop-img2 fangda">
          <img class="fd-img ttu1" src=${dt.tu1}>
</div>
          <div class="img-list fl">
            <ul>
              <li class="xiaotu">
                <img
                  src=${dt.tu1}>
              </li>
              <li class="xiaotu"><img
                  src=${dt.tu2}>
              </li>
              <li class="xiaotu"><img
                  src=${dt.tu3}>
              </li>
              <li class="xiaotu"><img
                  src=${dt.tu4}>
              </li>
              <li class="xiaotu"><img
                  src=${dt.tu5}>
              </li>
            </ul>
          </div>
        </div>

        <!-- 商品详情文字介绍和加入购物车板块 -->
        <div class="xq-right fr">
          <div class="intro">
            <span>${dt.names}</span>
          </div>
          <div class="lim">
            <img src="http://yanxuan.nosdn.127.net/b6ade186a02baa39ee4d31f9c1ba9a9c.jpg " class="fl">
            <span class="fl">品类狂欢</span>
            <span class="fr end3"> 距离活动结束还有3天</span>
          </div>
          <div class="price">
            <ul class="pri">
            <li class="price-old">原价：¥<span class="oldj">${dt.oldprice}</span></li>
              <li class="price-m">现价：¥<span class="dj">${dt.price}</span></li>
              <li class="p-address">配送&nbsp;&nbsp;&nbsp;至深圳市南山区</li>
              <li class="p-youfei">邮费&nbsp;&nbsp;&nbsp;🈵️99免邮费</li>
              <li class="p-fan">购物返&nbsp;&nbsp;&nbsp;最高反99积分</li>
              
              <li class="p-shuliang">数量：
                <button class="jian">-</button><button class="shuliang">0</button><button class="jia">+</button>
                
                库存：${sum = parseInt(Math.random() * 160 + 10)}件
              </li>
            </ul>
          </div>
          <div class="btns">
           <a href="./shopcar.html"> <span class="buynow">立即购买</span></a>
            <span class="addcar">加入购物车</span>
          </div>
        </div>

      </div>
    </div>
    <div class="clear"></div>
    
 `
      shopxq.innerHTML = str
      var ttu1 = document.querySelectorAll('.ttu1');
      var xiaotu = Array.from(document.querySelectorAll('.xiaotu'));
      xiaotu.forEach(function (item) {
        item.addEventListener("click", click1)
      })
      function click1() {
        ttu1[0].src = this.firstElementChild.src;
        ttu1[1].src = this.firstElementChild.src;


      }


      $('.shop-img').mousemove(function (e) {
        var l = e.pageX - $(".shop-img").offset().left - ($(".mengban").width() / 2);
        var t = e.pageY - $(".shop-img").offset().left - ($(".mengban").height() / 2);
        // console.log(l,t)
        if (l < 0) {
          l = 0
        }
        if (l > $(this).width() - $(".mengban").width()) {
          l = $(this).width() - $(".mengban").width()
        }
        if (t < 0) {
          t = 0
        }
        if (t > $(this).height() - $(".mengban").height()) {
          t = $(this).height() - $(".mengban").height()
        }

        $(".mengban").css({
          "left": l,
          "top": t
        })

        var pX = l / ($(".shop-img").width() - $(".mengban").width())
        var pY = t / ($(".shop-img").height() - $(".mengban").height())
        $(".fangda img").css({
          "left": -pX * ($(".fangda img").width() - $(".fangda").width()),
          "top": -pY * ($(".fangda img").height() - $(".fangda").height())
        })
      })

      $('.shop-img').mouseenter(function () {

        //控制蒙版和右侧div显示
        $('.fangda').show();
        $('.mengban').show();
      })
      $('.shop-img').mouseleave(function () {
        //控制蒙版和右侧div隐藏
        $('.fangda').hide();
        $('.mengban').hide();

      })
      $('.jia').click(function () {
        $('.shuliang').html(+1);
        // console.log(111)
      })
      $('.jian').click(function () {
        $('.shuliang').html(0);
        // console.log(111)
      })
    })()
  } else {
    alert("参数有误")
    location.href = "./list.html"
  }
} else {
  alert("非法进入，请选择商品")
  location.href = "./list.html"
}
//给购物车按钮添加点击事件   点击跳转到购物车页面
shopcar.onclick = function () {
  location.href = "./shopcar.html"
}
box1()
function box1() {
  var shopxq = document.querySelector('.shopxq');
  // console.log(shopxq)
  shopxq.onclick = function () {
    var e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.innerHTML == "加入购物车") {
      //获取localStorage
      var cartList = localStorage.getItem("cartList") || []
      //判断当前cartList是否存在
      if (cartList.length > 0) {
        cartList = eval('(' + cartList + ')')
        var bool = true
        //遍历数组
        cartList.forEach(item => {
          //判断当前遍历的商品是否跟添加的商品相同
          if (dt.id == item.id) {
            bool = false
            //让当前的商品数量加1
            item.number++
            // console.log(item.number)
            //重新给localStorage设置键值对
            localStorage.setItem("cartList", JSON.stringify(cartList))
          }
        })
        if (bool) {
          dt.number = 1
          cartList.push(dt)
          localStorage.setItem("cartList", JSON.stringify(cartList))
        }
      } else {
        // console.log(dt.number)
        dt.number = 1
        cartList.push(dt)
        localStorage.setItem("cartList", JSON.stringify(cartList))
      }

    }

  }
}

