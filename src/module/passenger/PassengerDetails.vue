<template>
    <div class="Driver_details">
        <div class="details_port">
            <span><img src="../../img/pro.jpg"/></span>
            <dl>
                <dt>{{carData.userId}}</dt>
                <dd><b>车型：{{carData.brand}}</b><b class="mar">车牌：{{carData.carNo}}</b></dd>
            </dl>
            <a class="ck" v-link="">详情</a>
        </div>
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
                    <p>{{recordData.dStart}}</p>
                    <p>{{recordData.dEnd}}</p>
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
        <a class="button" href="tel:15347393950">联系他</a>
        <div class="details_introduce">请说明您是在E鹿顺风车平台看到的哦！</div>
    </div>



</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                carData : {},
                recordData : {},
                format : elUtil.dateFormat
            }
        },
        ready(){
            this.queryData()
        },
        methods : {
            queryData(){
                elUtil.jsonp({
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
            }
        }
    }
</script>