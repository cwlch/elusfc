<template>
    <div class="menu">
        <a v-link="{path : './passengerRelease'}" :class="{'hover' : $route.name =='passengerRelease'}">发布行程</a>
        <a v-link="{path : './passengerSearch'}" :class="{'hover' : $route.name =='passengerSearch'}">搜索行程</a>
        <a v-link="{path : '/account'}">个人中心</a>
    </div>
</template>
<script type="text/ecmascript-6">

</script>