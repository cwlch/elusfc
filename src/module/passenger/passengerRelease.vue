<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'passenger_release',type:'start'}}" v-model="savePar.uStartStr"/>
                    <input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'passenger_release',type:'end'}}" v-model="savePar.uEndStr"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="FindCar_Choice clear_fix">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="tel" v-model="savePar.uCount" placeholder="乘车人数"/>
                        <img class="Location img_a" src="../../img/icon_4.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice" id="date" v-model="savePar.uDate" type="text" placeholder="出发时间"/>
                        <img class="Location img_b" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te" v-model="savePar.remark" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>
        </div>
        <a class="button" @click="save()">发布找车信息</a>
    </div>
</template>
<script type="text/ecmascript-6">
        export default{
                data(){
            return{
                savePar : {
                    uStartStr : '您从哪儿出发',
                    uEndStr : '您要去哪儿?',
                    uStart : '',
                    uEnd : '',
                    uCount : '',
                    uDate : eluUtil.dateFormat("yyyy/mm/dd hh:ii"),
                    remark : ''
                }
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('passenger_release_start_address')),
                    end = JSON.parse(localStorage.getItem('passenger_release_end_address'));
            if(start){
                this.$set("savePar.uStartStr",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set('savePar.uStart',start.street.id);
            }
            if(end){
                this.$set("savePar.uEndStr",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set('savePar.uEnd',end.street.id);
            }
            this.dateInit();
        },
        methods : {
            save (){
                let par = Object.assign({
                    userId : eluConfig.user.id
                },this.savePar,{
                    uDate : new Date(this.savePar.uDate).getTime()
                });
                if(!par.uStart){
                    eluUtil.tipsMod("出发地不能为空");
                    return false;
                }
                if(!par.uEnd){
                    eluUtil.tipsMod("目的地不能为空");
                    return false;
                }
                if(!par.uCount){
                    eluUtil.tipsMod("可乘人数不能为空");
                    return false;
                }
                if(!par.uDate){
                    eluUtil.tipsMod("时间不能为空");
                    return false;
                }
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/publishRequire',
                    data : par
                }, function(res){
                    if(res.retCode == '200'){
                        let layer = eluUtil.layers(`<div class="passenger_layers"><b>发布成功</b><p>请前往<a href="./index.html#!/account/myTripPassenger" id="layers_url"> 发布记录 </a>中查看</p></div>`);
                        layer.$con.find('#layers_url').click(res =>{
                            layer.close();
                        });
                    }else{
                        eluUtil.tipsMod(res.retMsg);
                    }
                });
            },
            /**
             * 时间初始化,时间格式只到日
             */
            dateInit (){
                var now = new Date(this.savePar.uDate),
                        maxDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(),23,59);
                $('#date').mobiscroll().datetime({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
                    min: now,
                    max: maxDate,
                    dateWheels: 'MM dd',
                    dateFormat : 'yyyy/mm/dd',
                    rows : 3
                });
            }
        }
    }
</script>