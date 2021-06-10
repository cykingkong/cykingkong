
$('.new-img').hover(function () {
  console.log($(this).find('.img-a'))
  $(this).find('.img-b').addClass('opc')
  $(this).find('.img-a').removeClass('opc')
}, function () {
  $(this).find('.img-a').addClass('opc')
  $(this).find('.img-b').removeClass('opc')
})

$('.new-box').hover(function () {
  console.log($(this).find('.new-pn'))
  $(this).find('.new-pn').addClass('pn-bg')
}, function () {
  $(this).find('.new-pn').removeClass('pn-bg')

})
//跳转到列表页
var lista = document.querySelector('.new-p2>a')
lista.onclick = function () {
  location.href = './list.html'
}