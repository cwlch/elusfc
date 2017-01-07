<template>

    <div class="FindCar_box">
        <div class="Passenger_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'driver_search',type:'start'}}" v-model="startAddressName"/>
                    <input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'driver_search',type:'end'}}" v-model="endAddressName"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="Pass_date">
                <input type="text" id="txt1" placeholder="12月10日(今天)"/>
                <a v-link="{path:'/passenger/Find_car'}"><img src="../../img/icon_3.png"/></a>
            </div>
        </div>
        <!--<div class="Pass_btn">-->
            <!--<input  v-link="{path:'/passenger/PassengerResults/'}" type="button" value="寻找车辆"/>-->
        <!--</div>-->
        <a class="button">寻找车辆</a>
    </div>


</template>
<script>
    export default{
        data(){
            return{
                startAddressName : '您从哪儿出发?',
                startAddressVal : '',
                endAddressName : '您要去哪儿?',
                endAddressVal : ''
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_release_start_address')),
                end = JSON.parse(localStorage.getItem('driver_release_end_address'));
            if(start)this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
            if(end)this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
        }
    }
</script>