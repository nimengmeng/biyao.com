	

function ShopCar(url,selector){
    this.url = url; 
    this.main = $(selector);
    this.init();
};
ShopCar.prototype = {
    constructor:ShopCar,
    init(){
        //加载功能;
        this.loading()
        .then(function(res){
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
       
        this.json.moduleInfo.moduleItems.forEach(function(item){
            //  console.log(item.imageUrl);
        });
        
        html += `
        <div class="category-title">
            <p>${this.json.moduleInfo.moduleTitle}</p>
            <a target="_blank" href="#">查看全部 &gt;</a>
        </div>
        <ul class="category-list clearfix">
            `;
        var str='';
        this.json.moduleInfo.moduleItems.forEach(function(newItem){
        //console.log(newItem.imageUrl);
         str+=   `<li>
                        <a href="###">
                            <i>
                                <img src=${newItem.imageUrl} alt="">
                            </i>
                                <dl>
                                    <dt>${newItem.itemName}</dt>
                                    <dd>${newItem.itemPrice}</dd>
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

$(function(){

    var shopCar = new ShopCar("http://localhost/biyao/data/datafujin.json",".category-recommend-11");
    var shopCar = new ShopCar("http://localhost/biyao/data/datacainixihuan.json",".category-recommend-10");
    
})