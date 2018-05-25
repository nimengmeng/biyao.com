$(function(){
    // var opt = {
    //     url:"http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128",
    //     dataType:"jsonp",
    //     data:{page:1}
    // }
    // $.ajax(opt)
    // .then(function(res){
    //     console.log(res);
    // })
    var shopCar = new WaterFall("http://mce.meilishuo.com/jsonp/get/3?offset=0&frame=0&trace=0&limit=10&endId=0&pid=106888&_=1526369583128","#catecontent")
})

   function WaterFall(url,main_select){
       if(!url || !main_select) return;
       this.url = url;
       this.main_select = $(main_select);
       this.init();
   }
   WaterFall.prototype = {
       constructor:WaterFall,
       init(){
           this.page = 1;
           this.load_data()
           .then(function(res){
               this.json = res.data.list;
               //console.log(res);
               this.render_page();
               this.sort_item();
           }.bind(this))
           .fail(function(def,type,err_msg){
               //this.load_err();
           })
           //购物车数量
           this.carNum = $(".head_user .user_shopcar span");
           // console.log(this.carNum);
           this.carNum.html(this.getSum());
           this.main_select.on("click.addCar","button[data-id]",$.proxy(this.addCar,this));
           this.main_select.on("click.changeNum","button[data-id]",$.proxy(this.changeNum,this));
           $(document).on("scroll",$.proxy(this.is_load,this));
       },
       load_data(){
           this.opt = {
               url:this.url,
               dataType:"jsonp",
               data:{page:this.page},
               statusCode:{
                   404:function(){
                       alert("page no found");
                   },
                   403:function(){
                       alert("不允许访问！");
                   }
               }
           };
           return $.ajax(this.opt)
       },
       render_page(){
           //拼接字符串
           this.html = "<ul>";
           this.json.forEach(function(item){
            //console.log(item);
            this.html += `<li>
                            <a href="#">
                                <img src=${item.image} />
                                <h3>${item.title}</h3>
                                <p>￥${item.price}</p>
                            </a> 
                            <button data-id=${item.item_id}>加入购物车</button>
                         </li>`
           }.bind(this));
           this.html += "</ul>";
           this.main_select.html(this.main_select.html() + this.html);
       },
       sort_item(){
           this.children = this.main_select.find("li");
           var heightArray = [];
           for(var i = 0;i<this.children.length;i++){
               if(i<4){
                   heightArray.push($(this.children[i]).height());  
               }else{
                   var minHeight = Math.min.apply(false,heightArray);
                   var minIndex = heightArray.indexOf(minHeight);
                   this.children.eq(i).css({
                       position:"absolute",
                       left:this.children.eq(minIndex).position().left + 5,
                       top:minHeight += 15
                   })
                   heightArray[minIndex] = minHeight + this.children.eq(i).height();
               }
           }
       },
       load_err(){
           alert("出现错误！");
       },
       is_load(){
           this.scrollTop = $("html,body").scrollTop();
           this.clientHeight = document.documentElement.clientHeight;
           this.lastTop = this.main_select.find("li").eq(this.main_select.find("li").length - 1).position().top;
           //console.log(this.lastTop);
           this.loading = false; //是否符合加载条件
           if(this.scrollTop +this.clientHeight >= this.lastTop){
               this.loading = true;
           }
           if(!this.loading || this.loading_msg) return 0;
           this.loading_msg = true;
           this.page ++;
           this.load_data()
           .then(function(res){
               this.json =res.data.list;
               this.render_page();
               this.sort_item();
               this.loading_msg = false;
           }.bind(this))
          
       },
       addCar(event){
            //id获取 ---start;
		    //我怎么知道当前点击的元素是谁;
            var target = event.target || event.srcElement;
            var goodsId = $(target).attr("data-id");
            // console.log(goodsId);
            
            //id获取 ---end;

            //操作cookie存入购物车
            if(!$.cookie("shopCar")){
                var obj = [
                    {
                        id:goodsId,
                        num:1
                    }
                ]
                $.cookie("shopCar",JSON.stringify(obj));
                // console.log($.cookie("shopCar"));
                return 0;
            }
            //其余次数进行购物车添加;
            var shopCarString = $.cookie("shopCar");          
            var shopCarArray = JSON.parse(shopCarString);

            var hasItem = false;
            shopCarArray.forEach(function(item){
                if(item.id == goodsId){
                    //如果购物车列表之中有当前项，让商品数量自增
                    item.num ++;
                    hasItem = true;
                }
            })
            if(!hasItem){
                var item = {
                    id:goodsId,
                    num:1
                }
                shopCarArray.push(item)
            }
            // console.log( $.cookie("shopCar"));
            
            $.cookie("shopCar",JSON.stringify(shopCarArray));
       },
       changeNum(){
           this.carNum.html(this.getSum());
       },
       getSum(){
           var shopCarString = $.cookie("shopCar");
           if(shopCarString){
               var shopCarArray = JSON.parse(shopCarString);
               var sum = 0;
               shopCarArray.forEach(function(item){
                   sum += Number(item.num);
               })
               return sum;
           }
           return 0;
       }

   }
 

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
