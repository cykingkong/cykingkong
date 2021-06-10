


//获取操作对象
var xiangqing = document.querySelector(".xiangqing");
var pagination = document.querySelector(".pagination");
var chaxun = document.querySelector('.chaxun')
var chabtn = document.querySelector('.chabtn')
var email = getCookie("email")
// console.log(email)
var topa = document.querySelector('.top-a')

chabtn.onclick = async function () {
  var arr = await promiseAjax({
    url: '../php/list2.php',
    data: `chaxun=${$('.chaxun').val()}`
  })

  //这里获取了数据
  // console.log(arr, [])
  arr = eval('(' + arr + ')')
  // arr1 = eval('(' + '[]' + ')')
  if (arr.length <= 0) {
    alert('没有此商品')
    // return
  }
  // console.log(arr1)
  var o1 = {
    pageInfo: {
      pagenum: 1,
      pagesize: 8,
      totalsize: arr.length,
      totalpage: Math.ceil(arr.length / 8)
    },
    textInfo: {
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页"
    }
  }
  console.log(pagination)
  new Pagination(pagination, o1, (m) => {
    //通过页码，来进行分页数据显示
    var arr2 = arr.slice((m - 1) * 8, m * 8)
    // //创建字符串，拼接所有内容
    var str = `<img
        src="https://yanxuan.nosdn.127.net/606f3debc29509720715560427d1ab1f.jpg?type=webp&amp;imageView&amp;&amp;thumbnail=1090x310&amp;quality=95">`
    // //遍历数组中所有数据

    arr2.forEach(item => {
      str += `
        <div class="xq-shop">
        <!-- 商品图片 -->
        <div class="xqshop-img">
            <img src="${item.tu4}" style="width:100%;height:100%">
        </div>
        <!-- 商品信息 -->
        <div class="bd">
          <div class="xq-kb"></div>
          <div class="xq-p1">${item.names}</div>
          <div class="xq-money">¥${item.price}</div>
          <a  href="./xiangqing.html?id=${item.id}" class="addshopcar"  >查看详情</a>
        </div>
      </div>

            `

    })

    //把拼接好的内容渲染到页面中
    xiangqing.innerHTML = str
    //写js样式
    $('.xq-shop').hover(function () {
      $(this).css('margin-top', '30px');
      $(this).css('box-shadow', '0 0 0 1px #999');

    }, function () {
      $(this).css('margin-top', '40px');
      $(this).css('box-shadow', '0 0 0 0px');

    })

  })
}





if (email) {
  topa.innerHTML = "用户：" + email
} else {
  alert("尚未登陆，请登录")
  var url = location.herf
  location.href = './SignUp.html'
}
// console.log(xiangqing,pagination)
//通过自执行函数来获取数据
(async function () {
  var arr = await promiseAjax({
    url: '../php/list.php'
  })
  arr = eval('(' + arr + ')')
  // console.log(arr)
  var o1 = {
    pageInfo: {
      pagenum: 1,
      pagesize: 20,
      totalsize: arr.length,
      totalpage: Math.ceil(arr.length / 20)
    },
    textInfo: {
      first: "首页",
      prev: "上一页",
      next: "下一页",
      last: "尾页"
    }
  }
  // console.log(pagination)
  new Pagination(pagination, o1, (m) => {
    //通过页码，来进行分页数据显示
    var arr2 = arr.slice((m - 1) * 20, m * 20)
    // //创建字符串，拼接所有内容
    var str = `<img
        src="https://yanxuan.nosdn.127.net/606f3debc29509720715560427d1ab1f.jpg?type=webp&amp;imageView&amp;&amp;thumbnail=1090x310&amp;quality=95">`
    // //遍历数组中所有数据

    arr2.forEach(item => {
      str += `
        <div class="xq-shop">
        <!-- 商品图片 -->
        <div class="xqshop-img">
            <img src="${item.tu4}" style="width:100%;height:100%">
        </div>
        <!-- 商品信息 -->
        <div class="bd">
          <div class="xq-kb"></div>
          <div class="xq-p1">${item.names}</div>
          <div class="xq-money">¥${item.price}</div>
          <a  href="./xiangqing.html?id=${item.id}" class="addshopcar"  >查看详情</a>
        </div>
      </div>

            `

    })

    //把拼接好的内容渲染到页面中
    xiangqing.innerHTML = str
    //写js样式
    $('.xq-shop').hover(function () {
      $(this).css('margin-top', '30px');
      $(this).css('box-shadow', '0 0 0 1px #999');

    }, function () {
      $(this).css('margin-top', '40px');
      $(this).css('box-shadow', '0 0 0 0px');

    })

  })
})()
