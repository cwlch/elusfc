<template>
    <div class="menu">
        <!--<a v-link="{path : './driverRelease'}" :class="{'hover' : $route.name =='driverRelease'}">发布信息</a>-->
        <a @click="goRelease()" :class="{'hover' : $route.name =='driverRelease'}">发布找人</a>
        <a v-link="{path : './driverSearch'}" :class="{'hover' : $route.name =='driverSearch'}">找人</a>
        <!--<a v-link="{path : '/account',query:{type : 'driver'}}">个人中心</a>-->
        <a @click="goAccount()">个人中心</a>
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
                    this.$router.go('./driverRelease');
//                    eluUtil.verifyPhone().then(()=>{
//                        this.$router.go('./driverRelease');
//                    });
                });
            },
            goAccount(){
                eluUtil.verifyLogin().then(()=>{
                    this.$router.go({
                        path : '/account',
                        query:{
                            type : 'driver'
                        }
                    });
                });
            }
        }
    }
</script>