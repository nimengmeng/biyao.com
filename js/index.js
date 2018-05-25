// //首页index.html

// //右侧栏
// //二维码显示隐藏
// $(".rightBar-code").hover(function(){
//     $("#code-right").css({
//         display:"block",
//     })
// },function(){
//     $("#code-right").css({
//         display:"none",
//     })
// })

// //回到顶部
// $(window).scroll(function(){
//     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     if(scrollTop > "30" ){
//         $(".rightBar-top").css({
//             display:"block"
//         })
//         $(".rightBar-top").on("click",function(){
//             document.documentElement.scrollTop = 0
//         })
//     }
// })

// //精选
// $(function(){
//     var $li = $(".category-recommend-1").find("li");
//     $li.mouseenter(function(){
//         $(this)
//         .stop().animate({width:620})
//         .siblings("li")
//         .stop().animate({width:89})
//         .find(".des")
//         .show()
//         .end()
//         .end()
//         .find(".des")
//         .hide()
//     })
//     // $li.mouseleave(function(){
//     //     // console.log($(this).index());
//     //     $li
//     //     .stop().animate({width:620})
//     //     .find(".des")
//     //     .show();
//     // })

// })
    

define(["jquery","banner","data","fujin"],function($,Banner,datas,Fujin){
    //轮播图
    //console.log(Banner);
    var options={
        navigation: {
            nextEl: '.gp6-button-next',
            prevEl: '.gp6-button-prev',
        },
        pagination:{
            el:".gp6-banner-pagination"
        },
        direction:"scroll",
        loop:true
    }
    new Banner(".gp6-banner-wrapper",options,this);
  
    // $(function(){
    //     $(".gp6-banner-container")
    //     .gpBanner(".gp6-banner-wrapper",{
    //         navigation: {
    //             nextEl: '.gp6-button-next',
    //             prevEl: '.gp6-button-prev',
    //         },
    //         pagination:{
    //             el:".gp6-banner-pagination"
    //         },
    //         direction:"scroll",
    //         loop:true
    //     }) 
    // })
    //console.log(datas);
    new datas("http://localhost/biyao/data/pinzhinanzhuang.json",".category-recommend-20");
    new datas("http://localhost/biyao/data/chaoliunvzhuang.json",".category-recommend-21");
    new datas("http://localhost/biyao/data/neiyiwaizi.json",".category-recommend-22");
    new datas("http://localhost/biyao/data/muyingertong.json",".category-recommend-23");
    new datas("http://localhost/biyao/data/nannvxiexue.json",".category-recommend-24");
    new datas("http://localhost/biyao/data/huwaiyundong.json",".category-recommend-25");
    new datas("http://localhost/biyao/data/pijupeijian.json",".category-recommend-26");
    new datas("http://localhost/biyao/data/chuxingbibei.json",".category-recommend-27");
    //console.log(Fujin);
    new Fujin("http://localhost/biyao/data/datafujin.json",".category-recommend-11");
    new Fujin("http://localhost/biyao/data/datacainixihuan.json",".category-recommend-10");

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
    });
    // $li.mouseleave(function(){
    //     // console.log($(this).index());
    //     $li
    //     .stop().animate({width:620})
    //     .find(".des")
    //     .show();
    // })

    });

    //右侧栏
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
    });

    //二维码显示隐藏
    $(".rightBar-code").hover(function(){
        $("#code-right").css({
            display:"block",
        })
    },function(){
        $("#code-right").css({
            display:"none",
        })
    });

    $(".nav-main").on("mouseover",function(){
        $(this).children("ul").show();
    });
    $(".nav-main").on("mouseout",function(){
        $(this).children("ul").hide();
    });
})