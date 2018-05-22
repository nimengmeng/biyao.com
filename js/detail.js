 
 // 放大镜
 function Magnifier(option) {
    //必选参数和非必选参数
    this.small_ele = $(option.small_ele);
    this.focus_ele = $(option.focus_ele);
    this.big_ele = $(option.big_ele);
    if (this.small_ele.length == 0 || this.focus_ele.length == 0 || this.big_ele.length == 0) return;
    this.init();
}
Magnifier.prototype = {
    constructor: Magnifier,
    init() {
        this.scale = this.big_ele.width() / this.focus_ele.width();   //比例
        this.ratio();
        this.small_ele.on("mouseenter", { hidden: false }, $.proxy(this.toggleFocus, this));
        this.small_ele.on("mouseleave", { hidden: true }, $.proxy(this.toggleFocus, this));
        this.small_ele.on("mousemove.smallMove", $.proxy(this.smallMove, this));
        this.small_ele.on("mousemove.bigMove", $.proxy(this.bigMove, this));

        this.small_ele[0].onmousewheel = function (event) {
            var evt = event || window.event;
            this.ratio("ch", evt.wheelDelta);
        }.bind(this);
        this.small_ele[0].addEventListener("DOMMouseScroll", function (event) {
            this.ratio("ff", event.detail);
        }.bind(this));
    },
    //ratio比例
    ratio(brower_type, data) {
        //不传参数为缩放大图功能
        if (!brower_type || !data) {
            //按比例缩放大图
            var bigImg = this.big_ele.find("img");
            bigImg.css({
                width: Math.round(this.small_ele.width() * this.scale),
                height: Math.round(this.small_ele.height() * this.scale)
            });
            //如果做了这件事，其余就不做了
            return 0;
        }

        //传参数为鼠标滚轮事件 处理函数；
        //滚轮逻辑 向下滚是变小 向上滚是变大
        var turn;
        if (brower_type == "ch") {
            data > 0 ? turn = "top" : turn = "bottom";
        } else if (brower_type == "ff") {
            data > 0 ? turn = "bottom" : turn = "top";
        }

        //让小框宽高动起来
        var focus_ele_width = this.focus_ele.width();
        var focus_ele_height = this.focus_ele.height();

        if (turn == "top") {
            if (this.focus_ele.width() <= this.small_ele.width() * 0.8) {
                this.focus_ele
                    .css({
                        width: "+=2",
                        height: "+=2",
                        top: "-=1",
                        backgroundPosition: `${-this.focus_ele.position().left + 1}px ${-this.focus_ele.position().top + 1}px`
                    })

                var left = this.focus_ele.position().left;
                left = left <= 0 ? 0 : left - 1;
                this.focus_ele.css({
                    left: left
                })
            }
        } else if (turn == "bottom") {
            if (this.focus_ele.width() >= this.small_ele.width() * 0.1) {
                this.focus_ele
                    .css({
                        width: "-=2",
                        height: "-=2",
                        top: "+=1",
                        left: "+=1",
                        backgroundPosition: `${-this.focus_ele.position().left - 1}px ${-this.focus_ele.position().top - 1}px`
                    })
            }

        }
        this.scale = this.big_ele.width() / this.focus_ele.width();
        this.ratio();
        this.bigMove();

    },
    toggleFocus(event) {
        var opacity_img = this.small_ele.find(".opacity-img");
        if (event.data.hidden) {
            this.focus_ele.stop().fadeOut(200);
            this.big_ele.stop().fadeOut(200);
            opacity_img.stop().fadeTo("fast", 1);
        } else {
            this.focus_ele.stop().fadeIn(200);
            this.big_ele.stop().fadeIn(200);
            opacity_img.stop().fadeTo("fast", 0.3);
        }
    },
    smallMove(event) {
        var eleX = event.offsetX - this.focus_ele.width() / 2;
        var eleY = event.offsetY - this.focus_ele.height() / 2;

        //边界检测
        var maxWidth = this.small_ele.width() - this.focus_ele.width();
        var maxHeight = this.small_ele.height() - this.focus_ele.height();

        eleX = eleX <= 0 ? 0 : eleX;
        eleX = eleX >= maxWidth ? maxWidth : eleX;

        eleY = eleY <= 0 ? 0 : eleY;
        eleY = eleY >= maxHeight ? maxHeight : eleY;

        this.focus_ele.css({
            left: eleX,
            top: eleY,
            backgroundPosition: `${-eleX}px ${-eleY}px`
        })

        var fullLongX = this.small_ele.width() - this.focus_ele.width();
        var fullLongY = this.small_ele.height() - this.focus_ele.height();

        this.propX = Math.round(eleX / fullLongX * 100);
        this.proxy = Math.round(eleY / fullLongY * 100);
        //console.log(this.propX,this.proxy)
    },
    bigMove() {
        var bigImg = this.big_ele.find("img");
        var fullLongX = bigImg.width() - this.big_ele.width();
        var fullLongY = bigImg.height() - this.big_ele.height();

        var eleX = -Math.round(fullLongX * this.propX / 100);
        var eleY = -Math.round(fullLongY * this.proxy / 100);

        bigImg.css({
            left: eleX,
            top: eleY
        })
    }
}

new Magnifier({
    small_ele: ".small",
    focus_ele: ".grayBox",
    big_ele: ".big"
})

//顶部悬浮框
$(window).scroll(function(){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //console.log(scrollTop);
    if(scrollTop > "800"){
        if($("#T_Title").hasClass("view-retract") == false){
            $("#T_Title").addClass("view-retract");
        }
    }else{
        if($("#T_Title").hasClass("view-retract") == true){
            $("#T_Title").removeClass("view-retract");
        }
    }
})

