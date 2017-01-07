<template>
    <router-view></router-view>
    <account-menu></account-menu>
</template>
<style>
</style>
<script type="text/ecmascript-6">
    import accountMenu from "./common/menu.vue";
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components : {
            "account-menu" : accountMenu
        }
    }
</script>