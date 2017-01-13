<template>
   <div class="aut_main">
       <div class="aut_top">
           <div class="aut_top_icon">
               <img src="../../img/icon_14.png"/>
           </div>
           <div class="aut_tu">
               <img src="../../img/icon_15.png"/>
               <p v-model="msg.userId">{{msg.userId}}</p>
               <span v-model="msg.phone">{{msg.phone}}</span>
           </div>
       </div>
       <div class="aut_list_b">
           <ul>
               <li class="img1"><img src="../../img/icon_16.png"/><a href="#">我的消息</a></li>
               <li class="img2"><img src="../../img/icon_17.png"/><a href="#">我的行程</a></li>
               <li class="img3"><img src="../../img/icon_18.png"/><a href="#">我的评价</a></li>
               <li class="img4"><img src="../../img/icon_19.png"/><a href="#">我的好友</a></li>
               <li class="img5"><img src="../../img/icon_20.png"/><a href="#">关注路线</a></li>
               <li class="img6"><img src="../../img/icon_21.png"/><a href="#">系统设置</a></li>
           </ul>
       </div>
       <a class="button" v-link="{path:'/account/'}">认证成为车主</a>
   </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:{
                    userId:'',
                    phone:''
                }
            }
        },
        ready(){
            this.Obtain();
        },
        methods : {
            Obtain(){
                let par = Object.assign({},this.msg);
                $.ajax({
                    url : eluConfig.serverPath + 'user/queryRequireDetail',
                    type : 'get',
                    dataType : "jsonp",
                    data:par,
                    success : function (data) {
                        console.log(data);
                    }
                });
            }
        }
    }
</script>