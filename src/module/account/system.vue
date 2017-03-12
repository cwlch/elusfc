<template>
    <div class="aut_zl_bj_li">
        <div class="aut_zl_blist1">
                <ul>
                    <li v-link="{path : './agreement'}">
                        <label>服务协议</label>
                        <img src="../../img/icon_26.png"/>
                    </li>
                    <li v-link="{path : './about'}">
                        <label>关于e鹿同行</label>
                        <img src="../../img/icon_26.png"/>
                    </li>
                </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>