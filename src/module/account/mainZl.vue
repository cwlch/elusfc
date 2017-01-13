<template>
   <div class="aut_main">
       <div class="aut_zl">
           <div class="aut_zls">
               <ul>
                   <li class="curr">个人</li>
                   <li v-link="{path:'./mainEdit'}">车辆</li>
               </ul>
           </div>
       </div>
       <div class="aut_zl_tu">
           <div class="aut_zl_t">
               <img src="../../img/icon_24.png"/>
               <span><a href="#"> <img src="../../img/icon_25.png"/></a></span>
           </div>
       </div>
       <div class="aut_zl_bd">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>呢称</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>性别</label>
                            <input type="text">
                        </li>
                        <li>
                            <label>年龄</label>
                            <input type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>家乡</label>
                            <input type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                    </ul>
                </form>
            </div>
       </div>
       <a class="button v-link-active" href="#!/account/">保存</a>
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