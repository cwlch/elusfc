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
        <a class="button" href="tel:15347393950">联系他</a>
        <div class="details_introduce">请说明您是在E鹿顺风车平台看到的哦！</div>
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
            }
        }
    }
</script>