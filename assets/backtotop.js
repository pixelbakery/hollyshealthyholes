
$(document).ready(function(){
  $(".clickable-row").click(function() {
        window.location = $(this).data('url');
    });
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
