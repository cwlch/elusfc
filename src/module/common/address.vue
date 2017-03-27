<template>
    <div class="Testing_Location">
        <div class="Testing_title">
            <p>
                <img src="../../img/icon_13.png"/>
                <input class="dq" type="text" v-model="cityName" @focus="selectedFocus('city')" placeholder="当前城市"/>
                <input class="xq" type="text" v-model="countyName" @focus="selectedFocus('county')"  placeholder="区县"/>
                <input class="qn" type="text" v-model="streetName" @focus="selectedFocus('street')"  placeholder="你要去哪儿"/>
            </p>
            <a @click="goBack()">取消</a>
        </div>
        <div class="Testing_main">
            <p v-if="queryTipsTxt.length > 0">{{queryTipsTxt}}</p>
            <!--<dl>-->
                <!--<dt v-if="queryTipsTxt.length > 0">{{queryTipsTxt}}</dt>-->
                <!--<dd v-for="i in listData" data-id="{{i.id}}" @click="selectedAddres(i.id,i.areaName)">{{i.areaName}}</dd>-->
            <!--</dl>-->

            <dl :id="i.key" v-for="i in listData">
                <dt>{{i.key}}</dt>
                <dd v-for="x in i.childrens" data-id="{{x.id}}" @click="selectedAddres(x.id,x.areaName)">{{x.areaName}}</dd>
            </dl>
        </div>
        <ul class="Fixed">
            <li v-for="i in listData" :class="{'hover' : currentLetter == i.key}" @click="setScrollTop(i.key)">{{i.key}}</li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
//Bug 每次选择二级目录时没有缓存在本地
    export default{
        data (){
            return {
                currentKey : null,
                addresData : [],
                listData : [],
                queryTipsTxt : '数据加载中...',
                selectedData : {
                    city : {},
                    county:{},
                    street : {}
                },
                query : this.$route.query
            }
        },
        ready(){
            this.reloadCurrentKey();
        },
        computed :{
            cityName (){return this.selectedData.city.name} ,
            countyName (){return  this.selectedData.county.name},
            streetName (){return this.selectedData.street.name}
        },
        methods:{
            /**
             * 设置当前展示地区
             */
            reloadCurrentKey (type){
                if(type){
                    this.$set("currentKey",type);
                }else{
                    if(!this.cityName){
                        this.reloadCurrentKey('city');
                        this.setListData('city')
                    }else if(!this.countyName){
                        this.reloadCurrentKey('county');
                        this.setListData('county')
                    }else if(!this.streetName){
                        this.reloadCurrentKey('street');
                        this.setListData('street')
                    }
                }

            },
            /**
             * 设置当前需要展示的地区数据
             * @param type 当前显示类型
             */
            setListData (type){
                let promesin,
                        azData = [];

                this.$set('queryTipsTxt',"数据加载中...");
                this.$set('listData', []);
                switch (type){
                    case 'city':
                        promesin = this.queryCity();
                        break;
                    case 'county':
                        promesin = this.queryCounty();
                        break;
                    default :
                        promesin = this.queryStreet();
                        break;
                }
                promesin.then( data => {
                    if(data.length > 0){
                        this.$set('queryTipsTxt',"");
                    }else{
                        this.$set('queryTipsTxt',"暂无数据");
                    }
                    for(let i = 0,key,myData ; i < 26;i++){
                        key = String.fromCharCode(65+i);
                        myData = [];
                        for(let x of data){
                            if(key == x.headerChart){
                                myData.push(x)
                            }
                        }
                        if(myData.length > 0){
                            azData.push({
                                key : key,
                                childrens: myData
                            })
                        }

                    }
                    this.$set('listData', azData)
                })
            },
            /**
             * 查询城市数据
             * @return Promise
             */
            queryCity(){
                return new Promise( (res,rej) => {
                    let data = JSON.parse(localStorage.getItem('addresData'));
                    if(!data){
                        //如果本地没有数据则在这做数据请求
                        eluUtil.jsonp({
                            url : eluConfig.serverPath + 'areas/queryAreas',
                            data : {
                                level : 2
                            }
                        },({result}) => {
                            localStorage.setItem("addresData",JSON.stringify(result));
                            this.$set("addresData",result);
                            res(result);
                        });
                    }else{
                        this.$set("addresData",data);
                        res(data);
                    }
                });
            },
            /**
             * 查询区县数据
             * @return Promise
             */
            queryCounty(){
                return new Promise( (res,rej) => {
                    let data = [],
                            mydata = this.addresData;
                    for(let i = mydata.length;i--;){
                        if(mydata[i].id === this.selectedData.city.id){
                            console.log(mydata[i].childrens);
                            console.log(mydata[i]);
                            if(mydata[i].childrens){
                                data = mydata[i].childrens;
                                res(data);
                            }else{
                                //如果发现本地数据没有这个市的区县就在这发送AJAX请求
                                eluUtil.jsonp({
                                    url : eluConfig.serverPath + 'areas/queryAreas',
                                    data : {
                                        level : 3,
                                        parentId : mydata[i].id
                                    }
                                },({result}) => {
                                    mydata[i].childrens = result;
                                    this.$set("addresData",mydata);
                                    sessionStorage.setItem("addresData",JSON.stringify(mydata));
                                    res(result);
                                });
                            }
                            break;
                        }
                    }
                });
            },
            /**
             * 查询街道数据
             * @return Promise
             */
            queryStreet(){
                return new Promise( (res,rej) => {
                    this.queryCounty().then( mydata => {
                        let data;
                        for(let i = mydata.length;i--;){
                            if(mydata[i].id === this.selectedData.county.id){
                                if(mydata[i].childrens){
                                    data = mydata[i].childrens;
                                    res(data);
                                }else{
                                    //如果发现本地数据没有这个县的街道就在这发送AJAX请求
                                    eluUtil.jsonp({
                                        url : eluConfig.serverPath + 'areas/queryAreas',
                                        data : {
                                            level : 4,
                                            parentId : mydata[i].id
                                        }
                                    },({result}) => {
                                        res(result);
                                    });
                                }
                                break;
                            }
                        }
                    });
                });
            },
            /**
             * 输入框focus事件
             * @param type 输入框类型
             */
            selectedFocus(type){
                let  parentName;
                switch (type){
                    case 'county' :
                        parentName = 'city';
                        break;
                    case  'street' :
                        parentName = 'county';
                        break;
                    default:
                        parentName = null;
                        break;
                }
                if(parentName && !this[parentName+'Name']){
                    this.selectedFocus(parentName);
                }else{
                    this.setListData(type);
                    this.reloadCurrentKey(type);
                }
            },
            /**
             * 点选地址事件
             * @param id
             * @param name
             */
            selectedAddres(id,name){
                let currentKey = this.currentKey;
                //判断父级地区如果变化则清空子级地区
                if(this[currentKey + "Name"] !== name){
                    switch (currentKey){
                        case 'city':
                            this.$set('selectedData.county',{});
                            this.$set('selectedData.street',{});
                            break;
                        case 'county':
                            this.$set('selectedData.street',{});
                            break;
                        case 'street':

                            break;
                        default :
                            break;
                    }
                }
                //设置选中值
                this.$set("selectedData[currentKey]",{id : id,name:name});
                this.reloadCurrentKey();
                //选择到最好一级时自动确认选择并返回来源页
                if(currentKey==='street'){
                    let query = this.query;
                    localStorage.setItem(`${query.source}_${query.type}_address`,JSON.stringify(this.selectedData));
                    this.goBack();
                }
            },
            /**
             * 返回来源页面
             */
            goBack(){
                let path;
                switch (this.query.source){
                    case 'driver_release'://司机发布页面
                        path = '/driver/driverRelease';
                        break;
                    case 'driver_search'://司机搜索页面
                        path = '/driver/driverSearch';
                        break;
                    case 'passenger_release'://乘客发布页面
                        path = '/passenger/passengerRelease';
                        break;
                    case 'passenger_search'://乘客搜索页面
                        path = '/passenger/passengerSearch';
                        break;
                    case 'home'://乘客个人中心页面
                        path = '/account/userInfo';
                        break;
                    default ://默认返回司机端
                        path = '/driver'
                }
                this.$router.go(path)
            },
            setScrollTop(key){
                this.$set("currentLetter",key);
                $("body").scrollTop($("#" + key).offset().top - $(".Testing_title").height() - 10)
            }
        }
    }
</script>