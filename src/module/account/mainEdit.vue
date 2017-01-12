<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls">
                <ul>
                    <li>个人</li>
                    <li class="curr1">车辆</li>
                </ul>
            </div>
        </div>
        <div class="aut_zl_bj_li">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>驾驶证号</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>驾驶证</label>
                            <input type="text">
                            <a href="#"><img src="../../img/icon_27.png"/></a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <div class="aut_zl_bd">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>品牌型号</label>
                            <input type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>车牌号</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>车辆所属人</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>注册日期</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>行驶证</label>
                            <input type="text">
                            <a href="#"> <img src="../../img/icon_27.png"/></a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <a class="button v-link-active" href="#!/account/">申请认证</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        methods : {

        }
    }
</script>