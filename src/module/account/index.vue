<template>
    <router-view></router-view>
    <account-menu></account-menu>
</template>
<script type="text/ecmascript-6">
    import "../../sass/account.scss";
    import accountMenu from "./common/menu.vue";
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        ready(){

        },
        components : {
            "account-menu" : accountMenu
        }
    }
</script>