$(document).ready(function () {
    var desc = $("#hero-desc");
    var descs = ["Front End Developer", "Gamer", "Coder", "Moviegoer", "Perceiver"];
    var i = 0;
    desc.text(descs[i]);
    //desc.css("left", Math.floor(($(window).width() / 2) - ($(desc).width() / 2)));
    window.setInterval(function () {
        i++;
        i = (i > descs.length - 1) ? 0 : i;
        desc.removeClass("blur-in");
        desc.addClass("blur-out");
        window.setTimeout(function () {
            desc.text(descs[i]);
            //desc.css("left", Math.floor(($(window).width() / 2) - ($(desc).width() / 2)));
            desc.removeClass("blur-out");
            desc.addClass("blur-in");
        }, 1000);
    }, 4000);
});

$(window).scroll(function () {
    $('.skill').filter(checkVisible).addClass('pop-in');
    $('.skill').filter(checkHidden).removeClass('pop-in');
    $('.work').filter(checkVisible).addClass('slide-up');
    $('.work').filter(checkHidden).removeClass('slide-up');
    // select divs then filter them based on view 
}).scroll();

function checkVisible() {
    var elm = this;
    var eval = eval || "visible";
    var vpH = $(window).height(), // Viewport Height
        st = $(window).scrollTop(), // Scroll Top
        y = $(elm).offset().top,
        elementHeight = $(elm).height();

    if (eval == "visible") return ((y < (vpH + st)) && (y > (st - elementHeight)));
}

function checkHidden() {
    if ($(window).scrollTop() == 0) return true;
}