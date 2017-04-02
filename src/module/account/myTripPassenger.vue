<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls l">
                <ul>
                    <li class="curr">找车</li>
                    <li v-link="{path:'./myTripDriver'}">找人</li>
                </ul>
            </div>
            <div class="aut_xz">
                <m-vue-slect :opt-list="statusList" @change="queryData()" placeholder="选择状态" :v-model.sync="status" name-key="name" val-key="id"></m-vue-slect>
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
                    <div class="vehicles_right">
                        <em>{{format("mm-dd",i.uDate)}}</em>
                        <b>{{format("hh:ii",i.uDate)}}</b>
                    </div>
                </div>
            </a>
            <div class="Results_more" v-text="queryTxt"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import mSelect from  '../common/m-vue-slect.vue';
    export default{
        data(){
            return {
                queryTxt : "正在查询...",
                listData : [],
                status : 0,
                statusList : [
                    {
                        name : '进行中',
                        id : 0
                    },
                    {
                        name : '已结束或关闭',
                        id : 2
                    }
                ]
            }
        },
        ready(){
            this.queryData();
            this.setMainHeight();
        },
        components : {
            'm-vue-slect' : mSelect
        },
        methods:{
            queryData(){
                let par = {
                    page : 0,
                    per : 50,
                    uid : eluConfig.user.uid,
                    uStatus : this.status
                };
                this.$set("queryTxt","正在查询...");
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : par
                },({retCode,result}) =>{
                    if(result.length <= 0){
                        this.$set("queryTxt","没有更多数据");
                    }else{
                        this.$set("queryTxt","");
                    }
                    if(retCode == '200'){
                        this.$set("listData",result);
                    }
                });
            },
            format : eluUtil.dateFormat,
            setMainHeight(){
                let wH = $(document).height(),
                        tH = $(".aut_zl").height()+10,
                        bH = $(".menu").height(),
                        mH = wH - tH - bH;
                $(".Results_main").height(mH).css('margin-top',tH);
            }
        }
    }
</script>