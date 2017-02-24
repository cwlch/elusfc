<template>
    <div class="menu">
        <a v-link="{path : '/passenger/passengerSearch'}">我是乘客</a>
        <a @click="goDriver()">我是司机</a>
        <a v-link="{path : '/account'}" class="hover">个人中心</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        },
        ready(){

        },
        methods : {
            goDriver(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/verifyStatus',
                    data : {
                        id : 1
                    }
                },res => {
                    if(res.status == 0){
                        let layer = eluUtil.layers(`<div class="account_layers">
                        <p>需要认证成为司机才能使用司机端功能哦!</p>
                        <a>马上去认证</a></div>
                        `,{
                            close : false
                        });
                        layer.$con.find("a").on("click",()=>{
                            this.$router.go("/account/mainEdit");
                            layer.close();
                        });
                    }else{
                        this.$router.go("/driver/driverSearch");
                    }
                })
            }
        }
    }
</script>