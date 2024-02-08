
if (window.innerWidth < 768) {
    $("#offcanvasScrolling").removeClass("show")
    $(".body").css({
        with: "100%",
        left: 0
    })
}
else {
    $("#offcanvasScrolling").addClass("show")
    $(".body").css({
        width: "cals(100% - 300px)",
        left: "300px"
    })
}

window.addEventListener("resize", ()=>{
    if (window.innerWidth < 768) {
        $("#offcanvasScrolling").removeClass("show")
        $(".body").css({
            with: "100%",
            left: 0
        })
    }
    else {
        $("#offcanvasScrolling").addClass("show")
        $(".body").css({
            width: "cals(100% - 300px)",
            left: "300px"
        })
    } 
})

$(document).ready(function(){
    // filter
    // $('nav a').on('click', function(event){
    //     event.preventDefault();
    //     // current class
    //     $('nav li.current').removeClass('current');
    //     $(this).parent().addClass('current');

    //     // set new heading
    //     $('h1.heading').text($(this).text());
        
    //     // filter link text
    //     var category = $(this).text().toLowerCase().replace(' ', '-');
        
    //     // remove hidden class if "all" is selected
    //     if(category == 'all-projects'){
    //         $('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
    //     } else {
    //         $('ul#gallery li').each(function(){
    //            if(!$(this).hasClass(category)){
    //                $(this).hide().addClass('hidden');
    //            } else {
    //                $(this).fadeIn('slow').removeClass('hidden');
    //            }
    //         });
    //     }
    //     return false;        
    // });
    // lightbox
    $('ul #gallery a').on('click', function(event){
        event.preventDefault();
        var link = $(this).find('img').attr('src');
        $('.gallery img').attr('src', '');
        $('.gallery img').attr('src', link);
        $('.gallery').fadeIn('slow');
    });
    // close lightbox
    $('.gallery').on('click', function(event){
        event.preventDefault();
        $('.gallery').fadeOut('slow');
    });
});


