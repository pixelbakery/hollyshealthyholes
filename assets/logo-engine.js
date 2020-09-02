$(function () {
  var logo = $(".navbar-brand img ");
  var body = document.body;
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
     
      logo.attr("src", "https://media.pixelbakery.com/HHH/logos/PB_AspectRatio_HHH_PrimaryLogo_Pink_v1.svg");
      $('.nav-link').css("color" , "var(--hhh-color-lighteryellow)");
      $('.nav-link svg').css("fill" , "var(--hhh-color-lighteryellow)");
     
    }
    if ($(this).scrollTop() <= 500) {
      
      logo.attr("src", "https://media.pixelbakery.com/HHH/logos/PB_AspectRatio_HHH_PrimaryLogo_Pink_v1.svg");
		$('.nav-link').css("color" , "var(--hhh-color-brown)");
      	$('.nav-link svg').css("fill" , "var(--hhh-color-brown)");

    }
  });
  $( ".nav-item" ).hover(
  function() {
    $( this ).addClass( "hover" );
  }, function() {
    $( this ).removeClass( "hover" );
  });

});





$(function() {
  var header = $(".start-style");
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      header.removeClass('start-style').addClass("scroll-on");
    } else {
      header.removeClass("scroll-on").addClass('start-style');
    }
  });
});		



//Animation

$(document).ready(function() {
  $('body.hero-anime').removeClass('hero-anime');
});

//Menu On Hover

$('body').on('mouseenter mouseleave','.nav-item',function(e){
  if ($(window).width() > 750) {
    var _d=$(e.target).closest('.nav-item');_d.addClass('show');
    setTimeout(function(){
      _d[_d.filter(':hover')?'addClass':'removeClass']('show');
    },1);
  }
});	


(function(){
    var body = document.getElementsByTagName("body")[0],
        burger = document.querySelector('.burger-menu'),
        header = document.querySelector('.menu');
    
    	burger.onclick = function() {
        header.classList.toggle('menu-opened');
        if((header.getAttribute("class").indexOf("menu-opened") > -1) && ($(window).width() < 992)){
             $('body').css("overflow" , "hidden");
          
             window.scrollTo(0, 0); // scroll to the top of the page
        }
        else 
          $('body').css("overflow" , "none");
    }
}());

(function(){
  $( window ).resize = function() {
  	
	
}
}());

$( window ).resize(function() {
   var body = document.getElementsByTagName("body")[0];
   $('body').addClass("scroll");
   $('body').css("overflow" , "none !important");
});