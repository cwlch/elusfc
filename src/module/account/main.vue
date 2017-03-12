<template>
   <div class="aut_main">
       <div class="aut_top" v-link="{path : './home'}">
           <div class="aut_top_icon green">个人主页 </div>
           <div class="aut_tu">
               <img src="../../img/icon_15.png"/>
               <p v-model="msg.userId">{{data.userName}}</p>
               <span v-model="msg.phone">{{msg.phone}}</span>
           </div>
       </div>
       <div class="aut_list_b">
           <ul>
               <li class="img1 disable" @click="tips()"><img src="../../img/icon_16.png"/><a href="javascript:;">我的消息</a></li>
               <li class="img2" v-link="{path : 'myTripDriver'}"><img src="../../img/icon_17.png"/><a href="javascript:;">发布记录</a></li>
               <li class="img3 disable" @click="tips()"><img src="../../img/icon_18.png"/><a href="javascript:;">我的评价</a></li>
               <li class="img4 disable" @click="tips()"><img src="../../img/icon_19.png"/><a href="javascript:;">我的好友</a></li>
               <li class="img5 disable" @click="tips()"><img src="../../img/icon_20.png"/><a href="javascript:;">关注路线</a></li>
               <li class="img6" v-link="{path : 'system'}"><img src="../../img/icon_21.png"/><a href="javascript:;">系统设置</a></li>
           </ul>
       </div>
       <a class="button" v-if="!data.verifyDriver" v-link="{path:'/account/carInfo'}">认证成为车主</a>
   </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:{
                    uid:'test01'
                },
//                verifyDriver : eluConfig.user.verifyDriver,
                data : {}
            }
        },
        ready(){
            this.$set('data',eluConfig.user);
            console.log(eluConfig.user);
//            this.Obtain();
        },
        methods : {
            Obtain(){
                let par = Object.assign({},this.msg),
                        _this = this;

//                $.ajax({
//                    url : eluConfig.serverPath + 'user/queryUser',
//                    type : 'get',
//                    dataType : "jsonp",
//                    data:par,
//                    success : function (data) {
//                        if(data.retCode == '200'){
//                            _this.$set('data',data.user)
//                        }
//                        console.log(data);
//                    }
//                });
            },
            tips(){
                eluUtil.tipsMod("此模块暂未开通!");
            }
        }
    }
</script>