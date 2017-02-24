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
            <dl>
                <dt v-if="queryTipsTxt.length > 0">{{queryTipsTxt}}</dt>
                <dd v-for="i in listData" data-id="{{i.id}}" @click="selectedAddres(i.id,i.areaName)">{{i.areaName}}</dd>
            </dl>
        </div>
        <!--<ul class="Fixed">-->
            <!--<li>A</li>-->
            <!--<li>B</li>-->
            <!--<li>C</li>-->
            <!--<li>D</li>-->
            <!--<li>E</li>-->
            <!--<li>F</li>-->
            <!--<li>G</li>-->
            <!--<li>H</li>-->
            <!--<li>J</li>-->
            <!--<li>K</li>-->
            <!--<li>L</li>-->
            <!--<li>M</li>-->
            <!--<li>N</li>-->
            <!--<li>P</li>-->
            <!--<li>Q</li>-->
            <!--<li>R</li>-->
            <!--<li>S</li>-->
            <!--<li>T</li>-->
            <!--<li>W</li>-->
            <!--<li>X</li>-->
            <!--<li>Y</li>-->
            <!--<li>Z</li>-->
        <!--</ul>-->


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
                let promesin;

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
                    this.$set('listData', data)
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
                    case 'home'://乘客搜索页面
                        path = '/account/mainZl';
                        break;
                    default ://默认返回司机端
                        path = '/driver'
                }
                this.$router.go(path)
            }
        }
    }
</script>