<template>

    <div class="Passenger_box">
        <div class="Passenger_seach">
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
            <div class="Pass_date">
                <input type="text" id="txt1" placeholder="12月10日(今天)"/>
                <a v-link="{path:'/passenger/Find_car'}"><img src="../../img/icon_3.png"/></a>
            </div>
        </div>
        <div class="Pass_btn">
            <input @click="search()" type="button" value="寻找车辆"/>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                startAddressName : '',
                dStart : '',
                endAddressName : '',
                dEnd : ''
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('passenger_search_start_address')),
                    end = JSON.parse(localStorage.getItem('passenger_search_end_address'));
            if(start){
                this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set("dStart",start.street.id);
            }
            if(end){
                this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set("dEnd",end.street.id);
            }
        },
        methods : {
            search(){
                let par={
                    dStart : this.dStart,
                    dEnd : this.dEnd,
                    dDate : new Date().getTime()
                };
                elUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCar',
                    data : par
                },res=>{
                    console.log(res);
                })
            }
        }
    }
</script>