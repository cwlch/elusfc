<template>
    <router-view></router-view>
    <driver-menu></driver-menu>
</template>
<script type="text/ecmascript-6">
import driverMenu from "./common/menu.vue";
export default{
    data(){
        return{
            msg:'hello vue'
        }
    },
    components : {
        "driver-menu" : driverMenu
    }
}
</script>