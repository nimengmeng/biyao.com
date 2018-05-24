	

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
            console.log(res);
            this.json = res.data.modules;
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
        this.json.forEach(function(item){
        console.log(item)
        console.log(item.moduleInfo.moduleTitle);
        console.log(item.moduleInfo.moduleImage);
        console.log(item.moduleInfo.manufacturers);
        console.log(item.moduleInfo.moduleBrand)
        
        // console.log(item.moduleInfo.modulesItems.ext.image)
            html += `  <div class="category-recommend-3">
            <div class="category-title">
                <p>${item.moduleInfo.moduleTitle}</p>
                <a target="_blank" href="#">查看全部 &gt;</a>
            </div>
            <ul class="category-list clearfix">
                <li class="category-brand template3">
                    <a href="#">
                        <i>
                            <img src=${item.moduleInfo.moduleImage} alt="" />
                        </i>
                        <span>${item.moduleInfo.manufacturers}&nbsp;&nbsp;${item.moduleInfo.moduleBrand}</span>
                    </a>
                </li>`
                var str='';
                this.json.moduleInfo.moduleItems.forEach(function(newItem){
                console.log(newItem.imageUrl);
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
        </div>`

       
        // html += `<li>
        //             <a href="###">
        //                 <i>
        //                     <img src=${item.modulesInfo.modulesItems.ext.image} alt="">
        //                 </i>
        //                 <dl>
        //                     <dt>${item.modulesInfo.modulesItems.ext.itemName}</dt>
        //                     <dd>${item.modulesInfo.modulesItems.ext.itemPrice}</dd>
        //                 </dl>
        //             </a>
        //         </li>
        
        // `
        }.bind(this));
        this.main.html(html);
    }
}

$(function(){

    var shopCar = new ShopCar("http://localhost/biyao/data/pinzhinanzhuang.json",".category-recommend-20")
    
})