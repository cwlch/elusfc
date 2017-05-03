<template>
    <div class="menu">
        <!--<a v-link="{path : '/passenger/passengerSearch'}">我是乘客</a>-->
        <!--<a @click="verifyDriver('/driver/driverSearch')">我是司机</a>-->
        <a v-if="type == 'passenger'" @click="goPassenger()" :class="{'hover' : $route.name =='passengerRelease'}">发布找车</a>
        <a v-if="type == 'passenger'" v-link="{path : '/passenger/passengerSearch'}" :class="{'hover' : $route.name =='passengerSearch'}">找车</a>

        <a v-if="type == 'driver'" @click="goDriver()" :class="{'hover' : $route.name =='driverRelease'}">发布找人</a>
        <a v-if="type == 'driver'" v-link="{path : '/driver/driverSearch'}" :class="{'hover' : $route.name =='driverSearch'}">找人</a>
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
            goPassenger(){
                eluUtil.verifyPhone().then(()=>{
                    this.$router.go("/passenger/passengerRelease");
                });
            },
            goDriver(){
                eluUtil.verifyPhone().then(()=>{
                    this.$router.go("/driver/driverRelease");
                });
            }
        }
    }
</script>