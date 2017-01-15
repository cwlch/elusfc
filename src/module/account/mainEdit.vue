<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls">
                <ul>
                    <li v-link="{path:'./mainZl'}">个人</li>
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
                            <input v-model="data.carLord" type="text">
                        </li>
                        <li>
                            <label>驾驶证号</label>
                            <input v-model="data.licence_id"  type="text">
                        </li>
                        <li>
                            <label>驾驶证</label>
                            <input >
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
                            <input v-model="data.brand" type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>车牌号</label>
                            <input v-model="data.carNo" type="text">
                        </li>
                        <li>
                            <label>车辆所属人</label>
                            <input v-model="data.carLord" type="text">
                        </li>
                        <li>
                            <label>注册日期</label>
                            <input v-model="data.createTime" type="text">
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
        <a class="button v-link-active" @click="SubAdd()">申请认证</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                msg:{
                    uid:'test01',
                },
                data : {
                    licenceId:'12345655',
                    licenceImg:'b.jpg'
                }
            }
        },
        ready(){
            this.Obtain();
        },
        methods : {
            Obtain(){
                let par = Object.assign({},this.msg),
                    _this = this;
                $.ajax({
                    url : 'http://onlyone2017.com/elu/user/queryUserDetail',
                    type : 'get',
                    dataType : "jsonp",
                    data:par,
                    success : function (data) {
                        if(data.retCode == '200'){
                            data.car.createTime = eluUtil.dateFormat("yyyy/mm/dd",data.car.createTime);
                            _this.$set('data',Object.assign({},_this.data,data.car));
                            console.log(_this.data)
                        }
                    }
                });
            },
            SubAdd(){
                let parSer =Object.assign({},this.msg,this.data);
                parSer.createTime = new Date(parSer.createTime).getTime();
                if(!parSer.carLord){
                    eluUtil.tipsMod("姓名不能为空!");
                    return false;
                }
                /*
                *驾驶证和驾驶证号
                if(!parSer.carLord){
                    eluUtil.tipsMod("姓名不能为空!");
                    return false;
                }
                if(!parSer.carLord){
                    eluUtil.tipsMod("姓名不能为空!");
                    return false;
                }
                */
                if(!parSer.brand){
                    eluUtil.tipsMod("品牌型号不能为空!");
                    return false;
                }
                if(!parSer.carNo){
                    eluUtil.tipsMod("车牌号不能为空!");
                    return false;
                }
                if(!parSer.carLord){
                    eluUtil.tipsMod("车辆所属人不能为空!");
                    return false;
                }
                if(!parSer.createTime){
                    eluUtil.tipsMod("注册日期不能为空!");
                    return false;
                }
                $.ajax({
                    url : eluConfig.serverPath + 'user/addCarAndLicence',
                    type : 'get',
                    dataType : "jsonp",
                    data:parSer,
                    success : function (data) {
                        if(data.retCode == '200'){
                            eluUtil.tipsMod("提交成功！");
                        }
                    }
                });
            }
        }
    }
</script>