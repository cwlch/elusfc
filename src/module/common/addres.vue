<template>
    <div class="Testing_Location">
        <div class="Testing_title">
            <p>
                <img src="../../img/icon_13.png"/>
                <input class="dq" type="text" v-model="cityName" @focus="citySelected()" placeholder="当前城市"/>
                <input class="xq" type="text" v-model="countyName" @focus="countySelected()"  placeholder="区县"/>
                <input class="qn" type="text" v-model="streetName" @focus="streetSelected()"  placeholder="你要去哪儿"/>
            </p>
            <a @click="">取消</a>
        </div>
        <!--<h3>当前定位城市:北京市</h3>-->
        <!--<h2>热门城市</h2>-->
        <!--<ul class="hot">-->
            <!--<li class="this">北京</li>-->
            <!--<li>长沙</li>-->
            <!--<li>深圳</li>-->
            <!--<li>邵阳</li>-->
        <!--</ul>-->
        <div class="Testing_main">
            <dl>
                <dd v-for="i in listData" data-id="{{i.id}}" @click="selectedAddres(i.id,i.name)">{{i.name}}</dd>
            </dl>
        </div>
        <ul class="Fixed">
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
            <li>F</li>
            <li>G</li>
            <li>H</li>
            <li>J</li>
            <li>K</li>
            <li>L</li>
            <li>M</li>
            <li>N</li>
            <li>P</li>
            <li>Q</li>
            <li>R</li>
            <li>S</li>
            <li>T</li>
            <li>W</li>
            <li>X</li>
            <li>Y</li>
            <li>Z</li>
        </ul>


    </div>
</template>
<script type="text/ecmascript-6">
    let data = [
        {
            name : "邵阳",
            id : 1,
            childrens : [
                {
                    name : "城步",
                    id : 11,
                    childrens : [
                        {
                            name : "白毛坪",
                            id : 111
                        },
                        {
                            name : "南山",
                            id : 112
                        }
                    ]
                },
                {
                    name : "武冈",
                    id : 12
                }
            ]
        },
        {
            name : "北京",
            id : 2,
            childrens : [
                {
                    name : "昌平",
                    id : 21,
                    childrens : [
                        {
                            name : "霍营",
                            id : 211
                        },
                        {
                            name : "回龙观",
                            id : 212
                        }
                    ]
                },
                {
                    name : "朝阳",
                    id : 22
                }
            ]
        },
        {
            name : "天津",
            id : 3
        }
    ]
    export default{
        data (){
            return {
                currentKey : null,
                addresData : [],
                listData : [],
                selectedData : {
                    city : {},
                    county:{},
                    street : {}
                }
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
             * 设置当前需要展示的地区数据
             */
            reloadCurrentKey (type){
                if(type){
                    this.$set("currentKey",type);
                }else{
                    if(!this.cityName){
                        this.reloadCurrentKey('city');
                        this.queryCity();
                    }else if(!this.countyName){
                        this.reloadCurrentKey('county');
                        this.queryCounty();
                    }else if(!this.streetName){
                        this.reloadCurrentKey('street');
                        this.queryStreet();
                    }
                }

            },
            queryCity(){
                this.$set("addresData",data);
                this.$set("listData",Object.assign([],data));
            },
            queryCounty(){
                let data = this.addresData,my;
                for(let i = data.length;i--;){
                    if(data[i].id === this.selectedData.city.id){
                        if(data[i].childrens){
                            my = data[i].childrens;
                        }
                        break;
                    }
                }
                this.$set("listData",my);
            },
            queryStreet(){
                let data = this.listData,my;
                for(let i = data.length;i--;){
                    if(data[i].id === this.selectedData.county.id){
                        if(data[i].childrens){
                            my = data[i].childrens;
                        }
                        break;
                    }
                }
                this.$set("listData",my);
            },
            /**
             * 选择街道
             */
            streetSelected(){
                if(!this.countyName){
                    this.countySelected();
                }else{
                    this.reloadCurrentKey("street");
                }

            },
            /**
             *选择区县
             */
            countySelected(){
                if(!this.cityName){
                    this.citySelected();
                }else{
                    this.reloadCurrentKey("county");
                }
            },
            /**
             * 选择城市
             */
            citySelected(){
                this.reloadCurrentKey("city");
                this.queryCity();
            },
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
                        default :
                            break;
                    }
                }
                //设置选中值
                this.$set("selectedData[currentKey]",{id : id,name:name});
                this.reloadCurrentKey();
            }
        }
    }
</script>