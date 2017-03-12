<template>
   <div class="aut_main">
       <div class="aut_zl">
           <div class="aut_zls">
               <ul>
                   <li class="curr">个人</li>
                   <li v-link="{path:'./carInfo'}">车辆</li>
               </ul>
           </div>
       </div>
       <div class="aut_zl_tu aut_zl_top">
           <div class="aut_zl_t">
               <img src="../../img/icon_24.png"/>
               <span><img src="../../img/icon_25.png"/></span>
           </div>
       </div>
       <div class="aut_zl_bd">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>呢称</label>
                            <input v-model="data.userName" type="text">
                        </li>
                        <li>
                            <label>性别</label>
                            <m-vue-slect :opt-list="genderList" placeholder="请选择性别" :v-model.sync="data.gender" name-key="name" val-key="id"></m-vue-slect>

                        </li>
                        <li>
                            <label>年龄</label>
                            <input v-model="data.birth" id="date"  type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>家乡</label>
                            <input v-link="{path:'/address',query:{source:'home',type:'start'}}" v-model="data.homeStr"  type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                    </ul>
                </form>
            </div>
       </div>
       <a @click="EditDta()" class="button v-link-active">保存</a>
   </div>
</template>
<script type="text/ecmascript-6">
    import mSelect from  '../common/m-vue-slect.vue';
    export default{
        data(){
            return{
                msg:{
                    uid: eluConfig.user.uid
                },
                genderList : [
                    {
                        name : '男',
                        id : 0
                    },
                    {
                        name : '女',
                        id : 1
                    }
                ],
                data : {}
            }
        },
        ready(){
            this.Exhibition();
            this.dateInit();
        },
        components : {
            'm-vue-slect' : mSelect
        },
        methods : {
            format : eluUtil.dateFormat,
            Exhibition(){
                let par = Object.assign({},this.msg),
                    _this = this;
                $.ajax({
                    url : eluConfig.serverPath + 'user/queryUser',
                    type : 'get',
                    dataType : "jsonp",
                    data:par,
                    success : function (data) {
                        if(data.retCode == '200'){
                            data.user.birth = eluUtil.dateFormat("yyyy/mm/dd",data.user.birth);
                            _this.$set('data',data.user);
                            let start = JSON.parse(localStorage.getItem('home_start_address'));
                            _this.$set("data.homeStr",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                            _this.$set('data.home',start.street.id);
                        }
                    }
                });
            },
            EditDta(){
                let parSer =Object.assign({},this.msg,this.data);
                parSer.birth = new Date(parSer.birth).getTime();
                    if(!parSer.userName){
                        eluUtil.tipsMod("姓名不能为空!");
                        return false;
                    }
                    if(!parSer.gender){
                        eluUtil.tipsMod("性别必须填写！");
                        return false;
                    }
                    if(!parSer.birth){
                        eluUtil.tipsMod("年龄必须填写！");
                        return false;
                    }
                    if(!parSer.gender){
                        eluUtil.tipsMod("家乡必须填写！");
                        return false;
                    }
                    $.ajax({
                    url : eluConfig.serverPath + 'user/updateUser',
                    type : 'get',
                    dataType : "jsonp",
                    data:parSer,
                    success : function (data) {
                        if(data.retCode == '200'){
                            console.log(data);
                            eluUtil.tipsMod("提交成功！");
                        }
                    }
                });
            },
            /**
             * 时间控件初始化,注意这是到分钟
             */
            dateInit(){
//                var now = new Date(this.data.birth);
//                    maxDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), 23, 59);
                $('#date').mobiscroll().date({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
//                    minDate: now,
//                    maxDate: maxDate,
                    dateOrder: 'yyyy MM dd',
                    dateFormat: 'yyyy/mm/dd',
                    rows: 3
                });
            }
        }
    }
</script>