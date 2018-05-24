//首页index.html
// 导航
$(function(){
    $(".gp6-banner-container:eq(0)>ul>li").has("ul").nav();
    // $("nav:eq(0)>ul>li").has("ul").nav();
}) 
//轮播图
$(function(){
    $(".gp6-banner-container")
    .gpBanner(".gp6-banner-wrapper",{
        navigation: {
            nextEl: '.gp6-button-next',
            prevEl: '.gp6-button-prev',
        },
        pagination:{
            el:".gp6-banner-pagination"
        },
        direction:"scroll",
        loop:true
    }) 
})

//右侧栏
//二维码显示隐藏
$(".rightBar-code").hover(function(){
    $("#code-right").css({
        display:"block",
    })
},function(){
    $("#code-right").css({
        display:"none",
    })
})

//回到顶部
$(window).scroll(function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if(scrollTop > "30" ){
        $(".rightBar-top").css({
            display:"block"
        })
        $(".rightBar-top").on("click",function(){
            document.documentElement.scrollTop = 0
        })
    }
})

//精选
$(function(){
    var $li = $(".category-recommend-1").find("li");
    $li.mouseenter(function(){
        $(this)
        .stop().animate({width:620})
        .siblings("li")
        .stop().animate({width:89})
        .find(".des")
        .show()
        .end()
        .end()
        .find(".des")
        .hide()
    })
    // $li.mouseleave(function(){
    //     // console.log($(this).index());
    //     $li
    //     .stop().animate({width:620})
    //     .find(".des")
    //     .show();
    // })

})
    





