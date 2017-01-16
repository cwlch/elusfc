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
                            <input v-model="data.userLicence.licenceName" type="text">
                        </li>
                        <li>
                            <label>驾驶证号</label>
                            <input v-model="data.userLicence.licenceId"  type="text">
                        </li>
                        <li>
                            <label>驾驶证</label>
                            <input type="file" accept="image/*" @change="selectFile1">
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
                            <input v-model="data.car.brand" type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>车牌号</label>
                            <input v-model="data.car.carNo" type="text">
                        </li>
                        <li>
                            <label>车辆所属人</label>
                            <input v-model="data.car.carLord" type="text">
                        </li>
                        <li>
                            <label>注册日期</label>
                            <input v-model="data.car.regTime" type="text">
                        </li>
                        <li>
                            <label>行驶证</label>
                            <input type="file" accept="image/*" @change="selectFile2">
                            <a href="javascript:;"> <img src="../../img/icon_27.png"/></a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <img :src="'http://onlyone2017.com/images/' + data.car.regImg" style="width: 50px !important;"/>
        <img :src="'http://onlyone2017.com/images/' + data.userLicence.licenceImg" style="width: 50px !important;"/>
        <a class="button v-link-active" @click="SubAdd()">申请认证</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                uid:'test01',
                data : {}
            }
        },
        ready(){
            this.Obtain();
        },
        methods : {
            Obtain(){
                let par = {
                    uid : this.uid
                },
                    _this = this;
                eluUtil.jsonp({
                    url : eluConfig.serverPath +'user/queryUserDetail',
                    data:par
                },(data)=>{
                    if(data.retCode == '200'){
                        data.car.regTime = eluUtil.dateFormat("yyyy/mm/dd",data.car.regTime);
                        _this.$set('data',data);
                    }
                });
            },
            SubAdd(){
                let data = this.data,
                    parSer = {
                        userId : data.car.userId,
                        licenceId : data.userLicence.licenceId,
                        liceneceImgCode : data.userLicence.liceneceImgCode,
                        licenceName: data.userLicence.licenceName,
                        carLord : data.car.carLord,
                        brand : data.car.brand,
                        carNo : data.car.carNo,
                        regTime : new Date(data.car.regTime).getTime(),
                        carImgCode : data.car.carImgCode
                    };
                if(!parSer.carLord){
                    eluUtil.tipsMod("姓名不能为空!");
                    return false;
                }
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
                if(!parSer.regTime){
                    eluUtil.tipsMod("注册日期不能为空!");
                    return false;
                }

                $.ajax({
                    url : eluConfig.serverPath + 'user/addCarAndLicence',
                    type : 'post',
                    data:parSer,
                    success : function (data) {
                        if(data.retCode == '200'){
                            eluUtil.tipsMod("提交成功！");
                        }
                    }
                });
            },
            selectFile1(e){
                let file = e.target.files[0],
                    reader = new FileReader();
                reader.readAsDataURL(file);
//                alert(file.size)
                reader.onload = (e) =>{
                    let bas64 = e.target.result.split(",")[1];
                    this.$set('data.car.carImgCode',bas64);
                };
            },
            selectFile2(e){
                let file = e.target.files[0],
                    reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) =>{
                    let bas64 = e.target.result.split(",")[1];
                    this.$set('data.userLicence.liceneceImgCode',bas64);
                };
            }
        }
    }
</script>