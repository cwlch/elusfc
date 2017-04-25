<template>
    <div class="menu">
        <!--<a v-link="{path : './passengerRelease'}" :class="{'hover' : $route.name =='passengerRelease'}">发布信息</a>-->
        <a @click="goRelease()" :class="{'hover' : $route.name =='passengerRelease'}">发布信息</a>
        <a v-link="{path : './passengerSearch'}" :class="{'hover' : $route.name =='passengerSearch'}">找车</a>
        <!--<a v-link="{path : '/account',query:{type : 'passenger'}}">个人中心</a>-->
        <a @click="goAccount()" >个人中心</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        },
        methods : {
            goRelease(){
                eluUtil.verifyLogin().then(()=>{
                    eluUtil.verifyPhone().then(()=>{
                        this.$router.go('./passengerRelease');
                    });
                });
            },
            goAccount(){
                eluUtil.verifyLogin().then(()=>{
                    this.$router.go({
                        path : '/account',
                        query:{
                            type : 'passenger'
                        }
                    });
                });
            }
        }
    }
</script>