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
        <h2 class="aut_zl_bd_titile">驾驶证
            <span v-if="data.userLicence.status == '1'" class="blue">认证中<small>(1-7个工作日)</small></span>
            <span v-if="data.userLicence.status == '2'" class="red">认证失败<small>(失败原因)</small></span>
            <span v-if="data.userLicence.status == '3'" class="green">认证成功</span>
        </h2>
        <div class="aut_zl_bj_li">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input v-model="data.userLicence.licenceName" disabled type="text">
                        </li>
                        <li>
                            <label>驾驶证号</label>
                            <input v-model="data.userLicence.licenceId" disabled type="text">
                        </li>
                        <li v-if="data.userLicence.status=='0' || data.userLicence.status=='2'">
                            <label>驾驶证</label>
                            <input type="file" accept="image/*" @change="selectFile1">
                            <a href="javascript:;"><img src="../../img/icon_27.png"/></a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <h2 class="aut_zl_bd_titile">行驶证
            <span v-if="data.car.status == '1'" class="blue">认证中<small>(1-7个工作日)</small></span>
            <span v-if="data.car.status == '2'" class="red">认证失败<small>(失败原因)</small></span>
            <span v-if="data.car.status == '3'" class="green">认证成功</span>
        </h2>
        <div class="aut_zl_bd">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>品牌型号</label>
                            <input v-model="data.car.brand" disabled type="text">
                            <img src="../../img/icon_26.png"/>
                        </li>
                        <li>
                            <label>车牌号</label>
                            <input v-model="data.car.carNo" disabled type="text">
                        </li>
                        <li>
                            <label>车辆所属人</label>
                            <input v-model="data.car.carLord" disabled type="text">
                        </li>
                        <li>
                            <label>注册日期</label>
                            <input v-model="data.car.regTime" disabled id="date" type="text">
                        </li>
                        <li v-if="data.car.status=='0' || data.car.status=='2'">
                            <label>行驶证</label>
                            <input type="file" accept="image/*" @change="selectFile2">
                            <a href="javascript:;"> <img src="../../img/icon_27.png"/></a>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <a class="button v-link-active" @click="SubAdd()">申请认证</a>
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
                        if(data.car.status == '0' || data.car.status =='2'){
                            $(".aut_zl_bd input").prop("disabled",false)
                        }
                        if(data.userLicence.status == '0' || data.userLicence.status =='2'){
                            $(".aut_zl_bj_li input").prop("disabled",false)
                        }
                        _this.dateInit();
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
                reader.onload = (e) =>{

                    eluUtil.convertImgToBase64(e.target.result,(str) => {
                        let bas64 =str.split(",")[1];
                        this.$set('data.car.carImgCode',bas64);
                    },file.type);
                };
            },
            selectFile2(e){
                let file = e.target.files[0],
                    reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) =>{
                    eluUtil.convertImgToBase64(e.target.result,(str) => {
                        let bas64 =str.split(",")[1];
                        this.$set('data.userLicence.liceneceImgCode',bas64);
                    },file.type);
                };
            },
            /**
             * 时间初始化,时间格式只到日
             */
            dateInit (){
                var now = new Date(this.data.car.regTime);
                $('#date').mobiscroll().date({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
//                    minDate: now,
                    maxDate: new Date(),
                    defaultValue : now,
//                    dateOrder: 'MM dd',
                    dateFormat : 'yyyy/mm/dd',
                    rows : 3
                });
            }
        }
    }
</script>