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
                <input type="text" v-model="uDate" id="txt1" placeholder="出发日期"/>
                <img src="../../img/icon_3.png"/>
            </div>
        </div>
        <!--<div class="Pass_btn">-->
            <!--<input  v-link="{path:'/passenger/PassengerResults/'}" type="button" value="寻找车辆"/>-->
        <!--</div>-->
        <a class="button" @click="search()">寻找乘客</a>
    </div>


</template>
<script  type="text/ecmascript-6">
    export default{
        data(){
            return{
                startAddressName : '',
                uStart : '',
                endAddressName : '',
                uEnd : '',
                uDate : eluUtil.dateFormat("yyyy/mm/dd")
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_search_start_address')),
                end = JSON.parse(localStorage.getItem('driver_search_end_address'));
            this.dateInit();
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
                    uDate : parseInt(new Date(this.uDate).getTime())
                };
                if(!par.uStart){
                    eluUtil.tipsMod("出发地不能为空!");
                    return false;
                }
                if(!par.uEnd){
                    eluUtil.tipsMod("目的地不能为空!");
                    return false;
                }
                sessionStorage.setItem("driverSearchPar",JSON.stringify(par));
                this.$router.go("./driverResults");
            },
            dateInit (){
                var now = new Date(this.uDate),
                    maxDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(),23,59);
                $('#txt1').mobiscroll().date({
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