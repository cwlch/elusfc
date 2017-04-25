<template>

    <div class="FindCar_box">
        <div class="Passenger_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <!--<input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'driver_search',type:'start'}}" v-model="startAddressName"/>-->
                    <!--<input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'driver_search',type:'end'}}" v-model="endAddressName"/>-->
                    <input placeholder="您从哪儿出发?" v-model="uStart"/>
                    <input placeholder="您要去哪儿?" v-model="uEnd"/>
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
    <h2 class="search_title" v-if="listData.length != 0">最新乘客信息</h2>
    <div class="Results_main" v-if="listData.length != 0">
        <a v-link="{path:'./driverDetails',query:{id:i.id,userId:i.userId}}" v-for="i in listData">
            <div class="vehicles_list">
                <img class="list_img_a" src="../../img/icon_6.png"/>
                <div class="vehicles_left marginTop">
                    <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.uCount}}位</span></p>
                    <p class="date"><b>更新时间:{{dateFormat("mm-dd",i.createTime)}}</b></p>
                </div>
                <img class="ve_line" src="../../img/icon_8.gif"/>
                <div class="vehicles_center v_top">
                    <p>{{i.uStartStr}}</p>
                    <p class="center"><img src="../../img/icon_9.png"/></p>
                    <p>{{i.uEndStr}}</p>
                </div>
                <div class="vehicles_right">{{dateFormat("mm-dd hh:ii",i.uDate)}}</div>
            </div>
        </a>
        <div class="Results_more" v-text="queryTxt"></div>
    </div>


</template>
<script  type="text/ecmascript-6">
    export default{
        data(){
            return{
//                startAddressName : '',
                uStart : '',
//                endAddressName : '',
                uEnd : '',
                uDate : eluUtil.dateFormat("yyyy/mm/dd"),
                listData : []
            }
        },
        ready(){
            this.queryData();
            let start = JSON.parse(localStorage.getItem('driver_search_start_address')),
                end = JSON.parse(localStorage.getItem('driver_search_end_address'));
            this.dateInit();
//            if(start){
//                let name = `- ${start.street.name}`,
//                        id = start.street.id;
//                if(!start.street.name){
//                    id = start.county.id;
//                    name = '';
//                }
//                this.$set("startAddressName",`${start.city.name} - ${start.county.name} ${name}`);
//                this.$set("uStart",id);
//            }
//            if(end){
//                let name = `- ${end.street.name}`,
//                        id = end.street.id;
//                if(!end.street.name){
//                    id = end.county.id;
//                    name = '';
//                }
//                this.$set("endAddressName",`${end.city.name} - ${end.county.name} ${name}`);
//                this.$set("uEnd",id);
//            }
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
            },queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : {
                        page : 0,
                        per : 5,
                        dStatus : 0
                    }
                },res=>{
                    this.$set("listData",this.listData.concat(res.result));
                });
            },
            dateFormat : eluUtil.dateFormat
        }
    }
</script>