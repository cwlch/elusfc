<template>
    <div class="Results">
        <div class="Results_title">
            <ul>
                <li class="current">11月01</li>
                <li>11月02</li>
                <li>11月03</li>
                <li>11月04</li>
            </ul>
            <img src="../../img/icon_5.png"/>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./driverDetails',query:{id:i.id}}" v-for="i in listData">
                <div class="vehicles_list">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left marginTop">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.uCount}}位</span></p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center v_top">
                        <p>{{i.uStart}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.uEnd}}</p>
                    </div>
                    <div class="vehicles_right">{{format("hh:ii",i.uDate)}}</div>
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
                searchPar : JSON.parse(sessionStorage.getItem("driverSearchPar")),
                listData : [],
                format : eluUtil.dateFormat
            }
        },
        ready(){
            this.queryData();
        },
        methods : {
            queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : this.searchPar
                },res=>{
                    this.$set("listData",res.result);
            });
            }
        }
    }
</script>