<template>
    <div>
        <br><br><br><br>我是司机
        <a v-link="{path:'/driver/list'}">下级</a>
    </div>
    <router-view></router-view>
</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>