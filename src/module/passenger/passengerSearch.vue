<template>

    <div class="Passenger_box">
        <div class="Passenger_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <!--<input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'passenger_search',type:'start'}}" v-model="startAddressName"/>-->
                    <!--<input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'passenger_search',type:'start'}}" v-model="startAddressName"/>-->
                    <input placeholder="您从哪儿出发?"  v-model="dStart"/>
                    <input placeholder="您要去哪儿?" v-model="dEnd"/>
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
    <h2 class="search_title" v-if="listData.length != 0">最新车辆信息</h2>

    <div class="Results_main" v-show="listData.length != 0">
    <a v-link="{path:'./passengerDetails',query:{id:i.id,carId:i.carId,userId : i.userId}}" v-for="i in listData">
        <div class="vehicles_list clear_fix">
            <img class="list_img_a" src="../../img/icon_6.png"/>
            <div class="vehicles_left">
                <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.dCount}}位</span></p>
                <p class="price">参考价:￥{{i.dPrice}}</p>
                <p class="date"><b>更新时间:{{dateFormat("mm-dd",i.createTime)}}</b></p>
            </div>
            <img class="ve_line" src="../../img/icon_8.gif"/>
            <div class="vehicles_center">
                <p>{{i.dStartStr}}</p>
                <p class="center"><img src="../../img/icon_9.png"/></p>
                <p>{{i.dEndStr}}</p>
            </div>
            <div class="vehicles_right">
                {{dateFormat("mm-dd hh:ii",i.dDate)}}
            </div>
            <em v-if="!i.status"><img src="../../img/notCert.png"/></em>
            <em v-if="i.status"><img src="../../img/yesCert.png"/></em>
        </div>
    </a>
    <div class="Results_more" v-text="queryTxt"></div>
</div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                queryTxt : "正在查询...",
                page : 0,
//                startAddressName : '',
                dStart : '',
//                endAddressName : '',
                dEnd : '' ,
                dDate : eluUtil.dateFormat("yyyy/mm/dd"),
                listData : []
            }
        },
        ready(){
            this.queryData();
            let start = JSON.parse(localStorage.getItem('passenger_search_start_address')),
                    end = JSON.parse(localStorage.getItem('passenger_search_end_address'));
            this.dateInit();

            $(".Results_main").on("swipeup",()=>{
                this.pageation();
            });

//            if(start){
//                let name = `- ${start.street.name}`,
//                        id = start.street.id;
//                if(!start.street.name){
//                    id = start.county.id;
//                    name = '';
//                }
//                this.$set("startAddressName",`${start.city.name} - ${start.county.name} ${name}`);
//                this.$set('dStart',id);
//            }
//            if(end){
//                let name = `- ${end.street.name}`,
//                        id = end.street.id;
//                if(!end.street.name){
//                    id = end.county.id;
//                    name = '';
//                }
//                this.$set("endAddressName",`${end.city.name} - ${end.county.name} ${name}`);
//                this.$set('dEnd',id);
//            }

//            if(start){
//                this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
//                this.$set("dStart",start.street.id);
//            }
//            if(end){
//                this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
//                this.$set("dEnd",end.street.id);
//            }
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

            },

            queryData(){

                this.$set("queryTxt","正在查询...");
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCar',
                    data : {
                        page : this.page,
                        per : 5,
                        dStatus : 0
                    }
                },res=>{
                    if(res.result.length <= 0){
                        this.$set("queryTxt","没有更多数据");
                    }else{
                        this.$set("queryTxt","下拉查看更多");
                    }
                    this.$set("listData",this.listData.concat(res.result));
                });
            },
            dateFormat : eluUtil.dateFormat,
            pageation(){
                this.page++;
                this.queryData();
            }
        }
    }
</script>