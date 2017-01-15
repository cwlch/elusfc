<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls">
                <ul>
                    <li class="curr">找车</li>
                    <li v-link="{path:'./myTripDriver'}">找人</li>
                </ul>
            </div>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./myTripPassengerDetail',query:{id:i.id}}" v-for="i in listData">
                <div class="vehicles_list">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left marginTop">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.uCount}}位</span></p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center v_top">
                        <p>{{i.uStartStr}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.uEndStr}}</p>
                    </div>
                    <div class="vehicles_right">{{format("mm-dd",i.uDate)}}</div>
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
                    uid : 'test01'
                };
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : par
                },({retCode,result}) =>{
                    if(retCode == '200'){
                        this.$set("listData",result);
                    }
                });
            },
            format : eluUtil.dateFormat
        }
    }
</script>