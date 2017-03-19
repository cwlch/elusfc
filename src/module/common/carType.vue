<template>
    <div class="Testing_Location">
        <div class="Testing_title">
            <p>
                <img src="../../img/icon_13.png"/>
                <input class="dq" type="text" v-model="brandName" placeholder="车辆品牌"/>
                <input class="xq" type="text" v-model="typeName" placeholder="车辆类型"/>
            </p>
            <a @click="goBack()">取消</a>
        </div>
        <div class="Testing_main">
            <dl>
                <dt v-if="queryTipsTxt.length > 0">{{queryTipsTxt}}</dt>
                <dd v-for="i in listData" data-id="{{i.id}}" @click="selectedCar(i.makeName)">{{i.makeName}}</dd>
            </dl>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                currentKey : null,
                queryTipsTxt : '数据加载中...',
                selectedData : {
                    brand : {},
                    type:{}
                },
                carBrandData : [],
                listData : []
            }
        },
        ready(){
            this.reloadCurrentKey();
        },
        computed :{
            brandName (){return this.selectedData.brand.makeName},
            typeName (){return  this.selectedData.type.makeName}
        },
        methods : {
            /**
             * 设置当前展示类型
             */
            reloadCurrentKey (type){
                if(type){
                    this.$set("currentKey",type);
                }else{
                    if(!this.brandName){
                        this.reloadCurrentKey('brand');
                        this.setListData('brand')
                    }else if(!this.countyName){
                        this.reloadCurrentKey('type');
                        this.setListData('type')
                    }
                }

            },
            setListData(type){
                let promesin;

                this.$set('queryTipsTxt',"数据加载中...");
                this.$set('listData', []);
                if (type == 'brand'){
                    promesin = this.getCarBrand();
                }else{
                    promesin = this.getCarType();
                }
                promesin.then( data => {
                    if(data.length > 0){
                        this.$set('queryTipsTxt',"");
                    }else{
                        this.$set('queryTipsTxt',"暂无数据");
                    }
                    this.$set('listData', data)
                })
            },
            /**
             *查询品牌下级类型
             */
            getCarType(){
                return new Promise((res,rej) =>{
                    let myData = this.carBrandData,
                        childData = [];
                    for(let i of myData){
                        if(i.makeName === this.selectedData.brand.makeName){
                            if(i.childrens){
                                childData = i.childrens;
                                res(childData);
                            }else{

                                eluUtil.jsonp({
                                    url : eluConfig.serverPath +'carController/queryCarTypeList',
                                    data : {
                                        makeName : this.brandName
                                    }
                                },({carTypeList}) =>{
                                    i.childrens = carTypeList;
                                    this.$set("carBrandData",myData);
                                    localStorage.setItem("carBrandData",JSON.stringify(myData));
                                    res(carTypeList);
                                });
                            }
                        }
                    }
                });
            },
            /**
             * 查询车辆品牌
             */
            getCarBrand(){
                return new Promise((res,rej) =>{
                    let data = JSON.parse(localStorage.getItem('carBrandData'));
                    if(data){
                        this.$set("carBrandData",data);
                        res(data);
                    }else {
                        eluUtil.jsonp({
                            url: eluConfig.serverPath + 'carController/queryCarBrandList'
                        }, ({carList}) => {
                            localStorage.setItem("carBrandData", JSON.stringify(carList));
                            this.$set("carBrandData", carList);
                            res(carList);
                        });
                    }
                });
            },
            /**
             * 点选地址事件
             * @param name
             */
            selectedCar(name){
                let currentKey = this.currentKey;
                //判断父级地区如果变化则清空子级地区
                if(this[currentKey + "Name"] !== name){
                    if(currentKey === 'brand'){
                        this.$set('selectedData.type',{});
                    }
                }
                //设置选中值
                this.$set("selectedData[currentKey]",{makeName : name});
                this.reloadCurrentKey();
                //选择到最好一级时自动确认选择并返回来源页
                if(currentKey==='type'){
//                    let query = this.query;
                    eluConfig.selectCarBrand = this.selectedData;
//                    sessionStorage.setItem(`selectCarBrand`,JSON.stringify(this.selectedData));
                    this.goBack();
                }
            },
            /**
             * 返回来源页面
             */
            goBack(){
                let path;
                switch (this.$route.query.source){
                    case 'car'://司机发布页面
                        path = '/account/carInfo';
                        break;
                    default ://默认返回司机端
                        path = '/account/userInfo'
                }
                this.$router.go(path)
            }
        }
    }
</script>