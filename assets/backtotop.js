
$(function(){$(".scroll").click(function(){$("html,body").animate({scrollTop:$(".top").offset().top},"1000");return false})})
$(document).ready(function(){

    $(window).scroll(function(){

        if ($(this).scrollTop() > 100) {

            $('#scroll-top').fadeIn();
        } else {

            $('#scroll-top').fadeOut();
        }
    });
    $('#scroll-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
$(document).ready(function(){
    console.log("Shopify Website designed and developed by Pixel Bakery Design Studio in Lincoln, Nebraska. For more info visit https://pixelbakery.com");
  $(".clickable-row").click(function() {
        window.location = $(this).data('url');
    });
});
var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      // console.log(el);
    }
  }
);
