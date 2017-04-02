<template>

    <div class="Passenger_box">
        <div class="Passenger_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'passenger_search',type:'start'}}" v-model="startAddressName"/>
                    <input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'passenger_search',type:'end'}}" v-model="endAddressName"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="Pass_date">
                <input type="text" id="date" v-model="dDate" placeholder="12月10日(今天)"/>
                <img src="../../img/icon_3.png"/>
            </div>
        </div>
        <a class="button" href="javascript:;" @click="search()">寻找车辆</a>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                startAddressName : '',
                dStart : '',
                endAddressName : '',
                dEnd : '' ,
                dDate : eluUtil.dateFormat("yyyy/mm/dd")
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('passenger_search_start_address')),
                    end = JSON.parse(localStorage.getItem('passenger_search_end_address'));
            this.dateInit();
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
            /**
             * 搜索按钮事件
             */
            search(){
                let par={
                    dStart : this.dStart,
                    dEnd : this.dEnd,
                    dDate : parseInt(new Date(this.dDate).getTime())
                };
                if(!par.dStart){
                    eluUtil.tipsMod("出发地不能为空!");
                    return false;
                }
                if(!par.dEnd){
                    eluUtil.tipsMod("目的地不能为空!");
                    return false;
                }
                sessionStorage.setItem("passengerSearchPar",JSON.stringify(par));
                this.$router.go("./passengerResults");
            },
            /**
             * 时间初始化,时间格式只到日
             */
            dateInit (){
                var now = new Date(this.dDate),
                        maxDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(),23,59);
                $('#date').mobiscroll().date({
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