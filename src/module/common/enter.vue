<template>
    <div class="enter">
        <h1 class="logo">e鹿同行</h1>
        <h2>一路同行, 绿色出行。更环保、更便捷!</h2>
        <div class="enter_btn" v-link="{path : '/passenger'}">我是乘客</div>
        <div class="enter_btn" v-link="{path : '/driver'}">我是司机</div>
    </div>
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