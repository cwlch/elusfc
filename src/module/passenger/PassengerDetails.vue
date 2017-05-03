<template>
    <div class="Driver_details">
        <div class="details_port">
            <span><img :src="userData.photoUrl"/></span>
            <dl v-if="carData.status == 3">
                <dt>{{carData.carLord}}</dt>
                <dd><b>车型：{{carData.brand}}</b><b class="mar">车牌：{{carData.carNo}}</b></dd>
            </dl>
            <em v-if="!carData || carData.status != 3">此用户暂未通过司机认证</em>
            <a class="ck" v-link="{path : 'home',query:{uid : userData.uid }}">详情</a>
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
                    <p>{{recordData.dStartStr}}</p>
                    <p>{{recordData.dEndStr}}</p>
                </li>
                <li class="moeny">
                    <span><img src="../../img/icon_7.png"/>还剩{{recordData.dCount}}个空位</span>
                    <b>参考价:￥{{recordData.dPrice}}</b>
                </li>
                <li class="Explain">
                    车主说：{{recordData.dRemark}}
                </li>
            </ul>
        </div>
        <a class="button" :href="tel">联系他</a>
        <div class="details_introduce">请说明您是在 e鹿同行看到的信息。</div>
    </div>



</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                carData : {},
                recordData : {},
                userData : {},
                format : eluUtil.dateFormat,
                tel : 'javascript:;'
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
                        carId : this.$route.query.carId,
                        userId : this.$route.query.userId
                    }
                },res => {
                    if(res.retCode == '200'){
                        this.$set('carData',res.car);
                        this.$set('recordData',res.record);
                        this.$set('userData',res.user);
                        this.$set('tel','tel:' +res.user.phone);
                    }
                })
            }
        }
    }
</script>