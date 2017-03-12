<template>
    <router-view></router-view>
    <driver-menu></driver-menu>
</template>
<script type="text/ecmascript-6">
import "../../sass/driver.scss";
import driverMenu from "./common/menu.vue";

export default{
    data(){
        return{
            msg:'hello vue'
        }
    },
    ready(){
        eluUtil.verifyDriver();
    },
    components : {
        "driver-menu" : driverMenu
    },
    methods : {
    }
}
</script>