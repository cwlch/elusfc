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
        <a class="button" @click="search()">寻找车辆</a>
    </div>


</template>
<script>
    export default{
        data(){
            return{
                startAddressName : '',
                uStart : '',
                endAddressName : '',
                uEnd : ''
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_search_start_address')),
                end = JSON.parse(localStorage.getItem('driver_search_end_address'));
            if(start){
                this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set("uStart",start.street.id);
            }
            if(end){
                this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set("uEnd",end.street.id);
            }
        },
        methods : {
            search(){
                let par={
                    uStart : this.uStart,
                    uEnd : this.uEnd,
//                    dDate : parseInt(new Date(eluUtil.dateFormat("yyyy-MM-dd") + "00:00").getTime()/1000)
                };
                sessionStorage.setItem("driverSearchPar",JSON.stringify(par));
                this.$router.go("./driverResults");
            }
        }
    }
</script>