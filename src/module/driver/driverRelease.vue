<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'driver_release',type:'start'}}" v-model="savePar.dStartStr"/>
                    <input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'driver_release',type:'end'}}" v-model="savePar.dEndStr"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="FindCar_Choice">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="tel" v-model="savePar.dCount" placeholder="还剩几个座位"/>
                        <img class="Location img_c" src="../../img/icon_11.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice " v-model="savePar.dPrice" type="tel" placeholder="收费多少呢"/>
                        <img class="Location img_d" src="../../img/icon_12.png"/>
                    </li>
                    <li  class="Location_to enter">
                        <input class="newDate" v-model="savePar.dDate" id="date" type="text" placeholder="2017年01月10  19:00"/>
                        <img class="Location img_d" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te"v-model="savePar.dRemark" placeholder="添加备注让乘客更愿意搭乘您的顺风车哦!"></textarea>


        </div>
            <a class="button" @click="save()">发布行程</a>
    </div>




</template>
<script type="text/ecmascript-6">
    //driver/publishCars
    export default{
        data(){
            return{
                savePar : {
                    dStart : '',
                    dStartStr : '您从哪儿出发?',
                    dEnd : '',
                    dEndStr : '您要去哪儿?',
                    dCount : '',
                    dDate : eluUtil.dateFormat("yyyy/mm/dd hh:ii"),
                    dPrice : '',
                    dRemark : ''
                }
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_release_start_address')),
                end = JSON.parse(localStorage.getItem('driver_release_end_address'));
            if(start){
                let name = `- ${start.street.name}`,
                        id = start.street.id;
                if(!start.street.name){
                    id = start.county.id;
                    name = '';
                }
                this.$set("savePar.dStartStr",`${start.city.name} - ${start.county.name} ${name}`);
                this.$set('savePar.dStart',id);
            }
            if(end){
                let name = `- ${end.street.name}`,
                        id = end.street.id;
                if(!end.street.name){
                    id = end.county.id;
                    name = '';
                }
                this.$set("savePar.dEndStr",`${end.city.name} - ${end.county.name} ${name}`);
                this.$set('savePar.dEnd',id);
            }
            this.dateInit();
//            eluUtil.verifyLogin().then(()=>{
//                eluUtil.verifyPhone();
//            });
        },
        methods : {
            save(){
                eluUtil.verifyDriver().then(()=>{
                    this.$router.go({path : '/account/carInfo',query:{type : 'driver'}});
                },()=>{
                    this.push();
                });
            },
            /**
             * 保存
             * @returns {boolean}
             */
            push (){
                let par = Object.assign({
                    userId: eluConfig.user.id,
                    carId: eluConfig.car.id || 0
                }, this.savePar, {
                    dDate: new Date(this.savePar.dDate).getTime()
                });
                if (!par.dStart) {
                    eluUtil.tipsMod("出发地点不能为空哦!");
                    return false;
                }
                if (!par.dEnd) {
                    eluUtil.tipsMod("目的地点不能为空哦!");
                    return false;
                }
                if (!par.dCount) {
                    eluUtil.tipsMod("坐位数不能为空!");
                    return false;
                }
                if (!par.dDate) {
                    eluUtil.tipsMod("时间不能为空!");
                    return false;
                }
                if (par.dDate < (new Date().getTime() + 10 * 60 * 1000)) {
                    eluUtil.tipsMod("时间必须为10分钟后!");
                    return false;
                }
                if (!par.dPrice) {
                    eluUtil.tipsMod("价格不能为空!");
                    return false;
                }
//                if (!par.dRemark) {
//                    eluUtil.tipsMod("备注不能为空!");
//                    return false;
//                }
                eluUtil.jsonp({
                    url: eluConfig.serverPath + 'driver/publishCars',
                    data: par
                }, (res) => {
                    if (res.retCode == '200') {
                        let layer = eluUtil.layers(`<div class="passenger_layers"><b>发布成功</b>
                            <p>请前往<a id="layers_url"> 发布记录 </a>中查看</p></div>`);
                        layer.$con.find('#layers_url').click(res =>{
                            layer.close();
                            this.$router.go({
                                path : '/account/myTripDriver',
                                query : {type : 'driver'}
                            });
                        });
                    }else{
                        eluUtil.tipsMod(res.retMsg);
                    }
                })
            },
            /**
             * 时间控件初始化,注意这是到分钟
             */
            dateInit (){
                var now = new Date(this.savePar.dDate),
                        maxDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate(), 23, 59);
                $('#date').mobiscroll().datetime({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
                    min: now,
                    max: maxDate,
                    dateWheels: 'MM dd DD',
                    dateFormat: 'yyyy/mm/dd',
                    rows: 3
                });
            }
        }
    }
</script>