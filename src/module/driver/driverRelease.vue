<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" v-link="{path:'/address',query:{source:'driver_release',type:'start'}}" v-model="startAddressName"/>
                    <input placeholder="您要去哪儿?" v-link="{path:'/address',query:{source:'driver_release',type:'end'}}" v-model="endAddressName"/>
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
                        <input class="newDate" v-model="savePar.dDate" type="text" placeholder="2017年01月10  19:00"/>
                        <img class="Location img_d" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te"v-model="savePar.dRemark" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>


        </div>
        <div class="Pass_btn">
            <input type="button" value="发布行程" @click="save()"/>
        </div>
    </div>




</template>
<script type="text/ecmascript-6">
    //driver/publishCars
    export default{
        data(){
            return{
                startAddressName : '您从哪儿出发?',
                endAddressName : '您要去哪儿?',
                savePar : {
                    dStart : '',
                    dEnd : '',
                    dCount : '',
                    dDate : '',
                    dPrice : '',
                    dRemark : ''
                }
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_release_start_address')),
                end = JSON.parse(localStorage.getItem('driver_release_end_address'));
            if(start){
                this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set('savePar.dStart',start.street.id);
            }
            if(end){
                this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set('savePar.dEnd',end.street.id);
            }
        },
        methods : {
            save (){
                let par= Object.assign({
                    userId : '123',
                    carId : '000'
                },this.savePar,{
                    dDate : parseInt(new Date().getTime()/1000)
                });
                if(!par.dStart){
                    elUtil.tipsMod("出发地点不能为空哦!");
                    return false;
                }
                if(!par.dEnd){
                    elUtil.tipsMod("目的地点不能为空哦!");
                    return false;
                }
                if(!par.dCount){
                    elUtil.tipsMod("坐位数不能为空!");
                    return false;
                }
                if(!par.dDate){
                    elUtil.tipsMod("时间不能为空!");
                    return false;
                }
                if(!par.dPrice){
                    elUtil.tipsMod("价格不能为空!");
                    return false;
                }
                if(!par.dRemark){
                    elUtil.tipsMod("备注不能为空!");
                    return false;
                }
                elUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/publishCars',
                    data : par
                }, (res) => {
                    if(res.retCode == '200'){
                        elUtil.tipsMod("成功")
                    }
                })
            }
        }
    }
</script>