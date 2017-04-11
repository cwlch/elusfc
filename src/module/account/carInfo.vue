<template>
    <div class="aut_main">
        <div class="aut_zl">
            <div class="aut_zls">
                <ul>
                    <li v-link="{path:'./userInfo'}">个人</li>
                    <li class="curr1">车主</li>
                </ul>
            </div>
        </div>
        <h2 class="aut_zl_bd_titile aut_zl_top">行驶证
            <span v-if="data.car.status == '1'" class="blue">认证中<small>(1-7个工作日)</small></span>
            <span v-if="data.car.status == '2'" class="red">认证失败<small>({{data.car.remark}})</small></span>
            <span v-if="data.car.status == '3'" class="green">认证成功</span>
        </h2>
        <div class="aut_zl_bd">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>品牌型号</label>
                            <input v-model="data.car.brand"  v-link="{path : '/carType',query:{'source':'car'}}" type="text">
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
                        <li class="relative">
                            <label>注册日期</label>
                            <input class="opacity_btn" v-model="data.car.regTime"  v-show="data.car.status !='1' && data.car.status !='3'" id="date" type="text">
                            <input v-model="data.car.regTime" type="text">
                        </li>
                        <li v-if="!data.car.status || data.car.status == '2'">
                            <label>行驶证</label>
                            <input type="file" accept="image/*" @change="selectFile2">
                            <a href="javascript:;">
                                <img v-if="!carImg" src="../../img/icon_27.png"/>
                                <img v-if="carImg" :src="carImg"/>
                            </a>
                            <i @click="openDemo('car')">示列</i>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <h2 class="aut_zl_bd_titile">驾驶证
            <span v-if="data.userLicence.status == '1'" class="blue">认证中<small>(1-7个工作日)</small></span>
            <span v-if="data.userLicence.status == '2'" class="red">认证失败<small>({{data.userLicence.remark}})</small></span>
            <span v-if="data.userLicence.status == '3'" class="green">认证成功</span>
        </h2>
        <div class="aut_zl_bj_li">
            <div class="aut_zl_blist1">
                <form>
                    <ul>
                        <li>
                            <label>姓名</label>
                            <input v-model="data.userLicence.realName" type="text">
                        </li>
                        <li>
                            <label>驾驶证号</label>
                            <input v-model="data.userLicence.licenceId" type="text">
                        </li>
                        <li v-if="!data.userLicence.status || data.userLicence.status=='2'">
                            <label>驾驶证</label>
                            <input type="file" accept="image/*" @change="selectFile1">
                            <a href="javascript:;">
                                <img v-if="!liceneceImg" src="../../img/icon_27.png"/>
                                <img v-if="liceneceImg" :src="liceneceImg"/>
                            </a>
                            <i @click="openDemo('user')">示列</i>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
        <a class="button v-link-active" v-if="!data.car.status || !data.userLicence.status || data.car.status == 2 || data.userLicence.status == 2" @click="SubAdd()">{{btnTxt}}</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                uid:'test01',
                data : {
                    car : {
                        brand : '',
                        carNo : ''
                    },
                    userLicence : {}
                },
                carImg : '',
                liceneceImg : '',
                type : 'add',
                btnTxt : '申请认证',
                ajaxStatus : false
            }
        },
        ready(){
            this.Obtain();
        },
        methods : {
            dateFormat : eluUtil.dateFormat,
            Obtain(){
                let par = {
                    uid : eluConfig.user.uid
                };
//                    _this = this;
                eluUtil.jsonp({
                    url : eluConfig.serverPath +'user/queryUserDetail',
                    data:par
                },(data)=>{
                    if(data.retCode == '200'){
                        data.car = data.car || {};
                        data.car.regTime = eluUtil.dateFormat('yyyy-mm-dd',data.car.regTime,'empty');
                        this.$set('data',Object.assign(this.data,data));
                        if(this.data.car.status == '3' || this.data.car.status =='1'){
                            $(".aut_zl_bd input").prop("disabled",true).addClass("disabled")
                        }
                        if(this.data.userLicence.status == '3' || this.data.userLicence.status =='1'){
                            $(".aut_zl_bj_li input").prop("disabled",true).addClass("disabled")
                        }
                        this.dateInit();
                        if(this.data.userLicence.realName){
                            this.type = 'edit';
                        }
                        let selectCarBrand = eluConfig.selectCarBrand;
                        if(selectCarBrand){
                            this.data.car.brand = `${selectCarBrand.brand.makeName} - ${selectCarBrand.type.makeName}`
                        }
                    }
                });
            },
            SubAdd(){
                if(this.ajaxStatus){
                    return false;
                }
                let data = this.data,
                    parSer = {
                        userId : eluConfig.user.id,
                        licenceId : data.userLicence.licenceId,
                        licenceName: data.userLicence.licenceName,
                        realName : data.userLicence.realName,
                        carLord : data.car.carLord,
                        brand : data.car.brand,
                        carNo : data.car.carNo,
                        regTime : new Date(data.car.regTime).getTime(),
                        carStatus : data.car.status,
                        licenceStatus : data.userLicence.status,
                        carId : data.car.id,
                        userLicenceId : data.userLicence.id,
                        carImgCode : data.car.carImgCode,
                        liceneceImgCode : data.userLicence.liceneceImgCode

                    };
                if(parSer.carStatus != 3){

                    if(!parSer.brand){
                        eluUtil.tipsMod("品牌型号不能为空!");
                        return false;
                    }
                    if(!parSer.carNo || !eluUtil.isCarPlate(parSer.carNo)){
                        eluUtil.tipsMod("请填写正确的车牌号码!");
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
                    if(!parSer.carImgCode){
                        eluUtil.tipsMod("请上传行驶证照片!");
                        return false;
                    }
                }
                if(parSer.licenceStatus != 3){
                    if(!parSer.carLord){
                        eluUtil.tipsMod("姓名不能为空!");
                        return false;
                    }
                    if(!parSer.licenceId || !eluUtil.isIdCard(parSer.licenceId )){
                        eluUtil.tipsMod("请填写正确的驾驶证号码!");
                        return false;
                    }
                    if(!parSer.liceneceImgCode){
                        eluUtil.tipsMod("请上传驾驶证照片!");
                        return false;
                    }
                }
                this.$set("btnTxt","正在提交...");
                this.ajaxStatus = true;
                $.ajax({
                    url : eluConfig.serverPath + (this.type =='add' ? 'user/addCarAndLicence' : 'user/updateCarAndLicence'),
                    type : 'post',
                    data:parSer,
                    success : (data) => {
                        this.ajaxStatus = false;
                        this.$set("btnTxt","申请认证");
                        if(data.retCode == '200'){
                            eluUtil.tipsMod("提交成功！");
                        }else{
                            eluUtil.tipsMod(data.retMsg);
                        }
                    },
                    error : ()=>{
                        this.ajaxStatus = false;
                        eluUtil.tipsMod("服务器错误！");
                        this.$set("btnTxt","申请认证");
                    }
                });
//                eluUtil.jsonp({
//                    url : eluConfig.serverPath + (this.type =='add' ? 'user/addCarAndLicence' : 'user/updateCarAndLicence'),
//                    data:parSer,
//                    success : function (data) {
//                        if(data.retCode == '200'){
//                            eluUtil.tipsMod("提交成功！");
//                        }
//                    }
//                });
            },
            selectFile1(e){
                let file = e.target.files[0],
                    reader = new FileReader(),
                        _this = this;
                reader.readAsDataURL(file);
                reader.onload = (e) =>{
                    this.$set("liceneceImg",e.target.result);
                    eluUtil.convertImgToBase64(e.target.result,(str) => {
                        let bas64 =str.split(",")[1];
                        _this.$set('data.userLicence.liceneceImgCode',bas64);
                    },file.type);
                };
            },
            selectFile2(e){
                let file = e.target.files[0],
                    reader = new FileReader(),
                        _this = this;
                reader.readAsDataURL(file);
                reader.onload = (e) =>{
                    this.$set("carImg",e.target.result);
                    eluUtil.convertImgToBase64(e.target.result,(str) => {
                        let bas64 =str.split(",")[1];
                        _this.$set('data.car.carImgCode',bas64);
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
                    max: new Date(),
//                    defaultValue : now,
//                    dateOrder: 'MM dd',
                    dateFormat : 'yyyy/mm/dd',
                    rows : 3
                });
            },
            getSetVal(val){
                alert(1)
                console.log(val)
            },
            openDemo(type){
                let layers = eluUtil.layers(`<div class="openDemo_layers"> <div class="img_${type}"></div><p>上传证件只需要正本,不需要副本。</p><span>知道了</span></div>`);
                layers.$con.find("span").on("click",()=>{
                    layers.close();
                })
            }
        }
    }
</script>