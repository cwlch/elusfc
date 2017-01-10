<template>
    <router-view></router-view>
    <passenger-menu></passenger-menu>
</template>
<script>
    import passengerMenu from "./common/menu.vue";
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components : {
            "passenger-menu" : passengerMenu
        }
    }
</script>
