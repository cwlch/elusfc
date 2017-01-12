<template>
    <div class="Results">
        <div class="Results_title">
            <ul>
                <li class="current" @click="selectDate('2017-01-06')">01月06</li>
                <li @click="selectDate('2017-01-07')">01月07</li>
                <li>11月03</li>
                <li>11月04</li>
            </ul>
            <img src="../../img/icon_5.png"/>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./passengerDetails',query:{id:i.id,carId:i.carId}}" v-for="i in listData">
                <div class="vehicles_list">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.dCount}}位</span></p>
                        <p class="price">参考价:￥{{i.dPrice}}</p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center">
                        <p>{{i.dStartStr}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.dEndStr}}</p>
                    </div>
                    <div class="vehicles_right">{{format("hh:ii",i.dDate)}}</div>
                </div>
            </a>

            <div class="Results_more">没有更多数据</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                searchPar : Object.assign({
                    page : 0,
                    per : 5
                },JSON.parse(sessionStorage.getItem("passengerSearchPar"))),
                listData : [],
                format : eluUtil.dateFormat
            }
        },
        ready(){
            this.queryData();
            $(".Results_main").on("swipeup",()=>{
                this.pageation();
            })
        },
        methods : {
            queryData(){
                let par = Object.assign({},this.searchPar);
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCar',
                    data : par
                },res=>{
                    this.$set("listData",this.listData.concat(res.result));
                });
            },
            selectDate(date){
                this.searchPar.dDate = date;
                this.queryData();
            },
            pageation(){
                this.searchPar.page++;
                this.queryData();
            }
        }
    }
</script>