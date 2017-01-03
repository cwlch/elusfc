<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" v-link="{path:'/address',query:{source:'passenger_search',type:'start'}}" v-model="startAddressName"/>
                    <input placeholder="您要去哪儿?" v-link="{path:'/address',query:{source:'passenger_search',type:'end'}}" v-model="endAddressName"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="FindCar_Choice">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="number" v-model="dCount" placeholder="还剩几个座位"/>
                        <img class="Location img_c" src="../../img/icon_11.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice " v-model="dPrice" type="number" placeholder="收费多少呢"/>
                        <img class="Location img_d" src="../../img/icon_12.png"/>
                    </li>
                    <li  class="Location_to enter">
                        <input class="newDate" v-model="dDate" type="text" placeholder="2017年01月10  19:00"/>
                        <img class="Location img_d" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te"v-model="dRemark" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>


        </div>
        <div class="Pass_btn">
            <input type="button" value="" @click="save()"/>
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
                dStart : '',
                dEnd : '',
                dCount : '',
                dDate : '',
                dPrice : '',
                dRemark : ''
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_release_start_address')),
                end = JSON.parse(localStorage.getItem('driver_release_end_address'));
            if(start){
                this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set('dStart',start.street.id);
            }
            if(end){
                this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set('dEnd',end.street.id);
            }
        },
        methods : {
            save (){
                let par= {
                    user_id : '123',
                    car_id : '000',
                    d_start : this.dStart,
                    d_end : this.dEnd,
                    d_count : this.dCount,
                    d_date : new Date().getTime(),//new Date(this.dDate).getTime(),
                    d_price : this.dPrice,
                    d_remark :this.dRemark
                };
                if(!par.d_start){
                    alert("出发地点不能为空!");
                    return false;
                }
                if(!par.d_end){
                    alert("终点不能为空!");
                    return false;
                }
                if(!par.d_count){
                    alert("坐位数不能为空!");
                    return false;
                }
                if(!par.d_date){
                    alert("时间不能为空!");
                    return false;
                }
                if(!par.d_price){
                    alert("价格不能为空!");
                    return false;
                }
                if(!par.d_remark){
                    alert("备注不能为空!");
                    return false;
                }
                elUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/publishCars',
                    data : par
                }, (res) => {
                    if(res.retCode == '200'){
                        alert("成功")
                    }
                })
            }
        }
    }
</script>