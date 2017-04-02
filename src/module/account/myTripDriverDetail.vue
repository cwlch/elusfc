<template>
    <div class="Driver_details">
        <div class="details_infor">
            <ul>
                <li class="title">
                    <span>出发日期：</span>
                    <span>{{format("mm-dd hh:ii",recordData.dDate)}}</span>
                    <b>{{format("mm-dd hh:ii",recordData.createTime)}}</b>
                    <b>最后更新:</b>
                </li>
                <li class="cho">
                    <span>
                        <img src="../../img/icon_10.png"/>
                    </span>
                    <p>{{recordData.dStartStr}}</p>
                    <p>{{recordData.dEndStr}}</p>
                </li>
                <li class="moeny">
                    <span><img src="../../img/icon_7.png"/>还剩{{recordData.dCount}}个空位</span>
                    <b>参考价:￥{{recordData.dPrice}}</b>
                </li>
                <li class="Explain">
                    师傅说：{{recordData.dRemark}}
                </li>
            </ul>
        </div>
        <a class="button cancel" v-if="recordData.dStatus == 2">已结束或关闭行程不能再操作</a>
        <a class="button" v-if="recordData.dStatus == 0" @click="setStatus(2)">关闭信息<em>(乘客已满,防止骚扰)</em></a>
        <!--<a class="button" v-if="recordData.dStatus == 1" @click="setStatus(0)">打开信息</a>-->
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                carData : {},
                recordData : {},
                format : eluUtil.dateFormat
            }
        },
        ready(){
            this.queryData()
        },
        methods : {
            queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCarDetail',
                    data : {
                        recordId : this.$route.query.id,
                        carId : 1,
                        userId : 1
                    }
                },res => {
                    if(res.retCode == '200'){
                        this.$set('carData',res.car);
                        this.$set('recordData',res.record);
                    }
                })
            },
            setStatus(type){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/updateDriverRecordStatus',
                    data : {
                        id : this.$route.query.id,
                        status : type
                    }
                },res => {
                    if(res.retCode == '200'){
                        this.recordData.dStatus = type;
                        eluUtil.tipsMod("关闭成功,您可以继续发布行程");
                    }else{
                        eluUtil.tipsMod("关闭失败" + res.retMsg);
                    }
                })
            }
        }
    }
</script>