<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls">
                <ul>
                    <li v-link="{path:'./myTripPassenger'}">找车</li>
                    <li class="curr1">找人</li>
                </ul>
            </div>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./myTripDriverDetail',query:{id:i.id,carId:i.carId}}" v-for="i in listData">
                <div class="vehicles_list clear_fix">
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
                    <div class="vehicles_right"><em>{{format("mm-dd",i.dDate)}}</em><b>{{format("hh:ii",i.dDate)}}</b></div>
                </div>
            </a>
            <div class="Results_more">没有更多数据</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                listData : []
            }
        },
        ready(){
            this.queryData();
        },
        methods:{
            queryData(){
                let par = {
                    page : 0,
                    per : 50,
                    uid : eluConfig.user.uid
                };
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCar',
                    data : par
                },({retCode,result}) =>{
                    if(retCode == '200'){
                        this.$set("listData",result);
                        console.log(result)
                    }
                });
            },
            format : eluUtil.dateFormat
        }
    }
</script>