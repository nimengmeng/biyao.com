	
;+function(factory){
    //AMD判断;
    if(typeof define === "function" && define.amd){
       define(["jquery"],factory)
    }else{
        factory(jQuery);
    }
}(function($){

    function DaData(url,selector){
        this.url = url; 
        this.main = $(selector);
        this.init();
    };
    DaData.prototype = {
        constructor:DaData,
        init(){
            //加载功能;
            this.loading()
            .then(function(res){
            // console.log(res);
                this.json = res;
                this.render()
            }.bind(this))

        },
        loading(){
            //加载数据;
            var opt = {
                url:this.url
            }
            return $.ajax(opt);
        },
        render(){
            var html = "";
            // console.log(this.json);
        
            // console.log(this.json.moduleInfo.moduleTitle);
            // console.log(this.json.moduleInfo.moduleImage);
            // console.log(this.json.moduleInfo.manufacturers);
            
            // console.log(this.json.moduleInfo.moduleItems)
            this.json.moduleInfo.moduleItems.forEach(function(item){
                //  console.log(item.imageUrl);
            });
            
            html += `
            <div class="category-title">
                <p>${this.json.moduleInfo.moduleTitle}</p>
                <a target="_blank" href="category.html">查看全部 &gt;</a>
            </div>
            <ul class="category-list clearfix">
                    <li class="category-brand template3">
                        <a target="_blank" href="category.html">
                            <i>
                                <img src=${this.json.moduleInfo.moduleImage} alt="" />
                            </i>
                            <span>${this.json.moduleInfo.manufacturers}&nbsp;&nbsp;${this.json.moduleInfo.moduleBrand}</span>
                        </a>
                    </li>
                `;
            var str='';
            this.json.moduleInfo.moduleItems.forEach(function(newItem){
            //console.log(newItem.image);
            str+=   `<li>
                            <a target="_blank" href="category.html">
                                <i>
                                    <img src=${newItem.image} alt="">
                                </i>
                                    <dl>
                                        <dt>${newItem.ext.itemName}</dt>
                                        <dd>${newItem.ext.itemPrice}</dd>
                                    </dl>
                                </a>
                        </li> `
            });


            html += str;
                

            html+=`</ul>
        `;

            this.main.html(html);
        }
    }
    $.daData = DaData;
   return DaData
});

// $(function(){

//     var shopCar = new DaData("http://localhost/biyao/data/pinzhinanzhuang.json",".category-recommend-20");
//     var shopCar = new DaData("http://localhost/biyao/data/chaoliunvzhuang.json",".category-recommend-21");
//     var shopCar = new DaData("http://localhost/biyao/data/neiyiwaizi.json",".category-recommend-22");
//     var shopCar = new DaData("http://localhost/biyao/data/muyingertong.json",".category-recommend-23");
//     var shopCar = new DaData("http://localhost/biyao/data/nannvxiexue.json",".category-recommend-24");
//     var shopCar = new DaData("http://localhost/biyao/data/huwaiyundong.json",".category-recommend-25");
//     var shopCar = new DaData("http://localhost/biyao/data/pijupeijian.json",".category-recommend-26");
//     var shopCar = new DaData("http://localhost/biyao/data/chuxingbibei.json",".category-recommend-27");
// })