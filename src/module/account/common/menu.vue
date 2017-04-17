<template>
    <div class="menu">
        <!--<a v-link="{path : '/passenger/passengerSearch'}">我是乘客</a>-->
        <!--<a @click="verifyDriver('/driver/driverSearch')">我是司机</a>-->
        <a v-if="type == 'passenger'" v-link="{path : '/passenger/passengerRelease'}" :class="{'hover' : $route.name =='passengerRelease'}">发布信息</a>
        <a v-if="type == 'passenger'" v-link="{path : '/passenger/passengerSearch'}" :class="{'hover' : $route.name =='passengerSearch'}">找车</a>

        <a v-if="type == 'driver'" v-link="{path : '/driver/driverSearch'}" :class="{'hover' : $route.name =='driverSearch'}">找人</a>
        <a v-if="type == 'driver'" v-link="{path : '/driver/driverRelease'}" :class="{'hover' : $route.name =='driverRelease'}">发布信息</a>
        <a v-link="{path : '/account',query:{type:$route.query.type}}" class="hover">个人中心</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                type : this.$route.query.type || sessionStorage.getItem("myPort")
            }
        },
        ready(){
            if(this.type){
                sessionStorage.setItem("myPort",this.type);
            }
        },
        methods : {
//            verifyDriver : eluUtil.verifyDriver
//            goDriver(){
////                eluUtil.jsonp({
////                    url : eluConfig.serverPath + 'user/verifyStatus',
////                    data : {
////                        id : 1
////                    }
////                },res => {
////                    if(eluConfig.user.verifyDriver == 0){
////                        let layer = eluUtil.layers(`<div class="account_layers">
////                        <p>需要认证成为司机才能使用司机端功能哦!</p>
////                        <a>马上去认证</a></div>
////                        `,{
////                            close : false
////                        });
////                        layer.$con.find("a").on("click",()=>{
////                            this.$router.go("/account/carInfo");
////                            layer.close();
////                        });
////                    }else{
////                        this.$router.go("/driver/driverSearch");
////                    }
////                })
//            }
        }
    }
</script>