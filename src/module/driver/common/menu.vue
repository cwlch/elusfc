<template>
    <div class="menu">
        <a v-link="{path : './driverRelease'}" :class="{'hover' : $route.name =='driverRelease'}">发布行程</a>
        <a v-link="{path : './driverSearch'}" :class="{'hover' : $route.name =='driverSearch'}">搜索行程</a>
        <a v-link="{path : '/account',query:{type : 'driver'}}">个人中心</a>
    </div>
</template>
<script type="text/ecmascript-6">

</script>