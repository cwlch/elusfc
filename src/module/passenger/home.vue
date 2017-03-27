<template>
    <div class="aut_main">
        <div class="aut_top">
            <div class="aut_top_icon">
                <!--<img v-link="{path:'userInfo'}" src="../../img/icon_14.png"/>-->
            </div>
            <div class="aut_tu">
                <img :src="user.photoUrl"/>
                <p>{{user.userName}}</p>
                <div class="aut_xin">
                    <!--<span class="aut_span_one">搭乘50次</span>-->
                    <!--<span class="aut_span_three">搭载53次</span>-->
                </div>
            </div>
        </div>
        <div class="aut_xin_list1">
            <dl v-if="car.brand">
                <dd><img src="../../img/icon_23.png"/></dd>
                <dt>
                    <h4>{{car.brand}}</h4>
                    <span>车牌号：{{car.carNo}}<br/>车辆注册日期：{{dateFormat('yyyy-mm-dd',car.regTime)}}<!--<br/>证件类型：C1--></span>
                </dt>
            </dl>
            <ul>
                <li>家乡：{{user.homeStr}}</li>
                <li>性别：{{user.gender == 1 ? '男' : '女'}}</li>
                <!--<li>行业：文化 广告 传媒</li>-->
                <!--<li>爱好：健身 运动 美女 香车</li>-->
                <!--<li>感情：保密</li>-->
                <li>年龄：{{ dateFormat("yyyy-mm-dd",user.birth)}}</li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                user : {},
                car : {}
            }
        },
        ready(){
          this.queryData();
        },
        methods : {
            dateFormat : eluUtil.dateFormat,
            queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryUser',
                    data : {
                        uid: this.$route.query.uid
                    }
                },res => {
                    this.$set("user",res.user);
                    this.$set("car",res.car);
                });
            }
        }
    }
</script>