<template>
    <div class="Driver_details">
        <div class="details_infor">
            <ul>
                <li class="title">
                    <span>出发日期：</span>
                    <span>{{format("mm-dd hh:ii",recordData.createTime)}}</span>
                    <b>{{format("mm-dd hh:ii",recordData.uDate)}}</b>
                    <b>最后更新:</b>
                </li>
                <li class="cho">
                    <span>
                        <img src="../../img/icon_10.png"/>
                    </span>
                    <p>{{recordData.uStartStr}}</p>
                    <p>{{recordData.uEndStr}}</p>
                </li>
                <li class="moeny">
                    <b>可坐人数：{{recordData.uCount}}位</b>
                </li>
                <li class="Explain">乘客说：{{recordData.remark}}</li>
            </ul>
        </div>
        <a class="button cancel" v-if="recordData.uStatus == 2">已经结束行程不能再操作</a>
        <a class="button" v-if="recordData.uStatus == 0" @click="setStatus(1)">关闭信息<em>(已找到顺风车,防止骚扰)</em></a>
        <a class="button" v-if="recordData.uStatus == 1" @click="setStatus(0)">打开信息</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                userData : {},
                recordData : {},
                userValData : {},
                format : eluUtil.dateFormat
            }
        },
        ready(){
            this.queryData()
        },
        methods : {
            queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequireDetail',
                    data : {
                        recordId : this.$route.query.id,
                        userId : 1
                    }
                },res => {
                    if(res.retCode == '200'){
                        this.$set('userData',res.user);
                        this.$set('userValData',res.userVal);
                        this.$set('recordData',res.record);
                    }
                })
            },
            setStatus(type){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/updateUserRecordStatus',
                    data : {
                        id : this.$route.query.id,
                        status : type
                    }
                },res => {
                    if(res.retCode == '200'){
                        this.recordData.uStatus = type;
                        eluUtil.tipsMod("修改成功");
                    }else{
                        eluUtil.tipsMod("修改失败" + res.retMsg);
                    }
                })
            }
        }
    }
</script>