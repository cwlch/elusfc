<template>
    <div class="Results">
        <div class="Results_title">
            <ul>
                <li v-for="i in dateList" :class="{'current' : i.time == searchPar.dDate}" @click="selectDate(i.time)">{{i.date}}</li>
            </ul>
            <img id="date" src="../../img/icon_5.png"/>
            <!--<input id="date" v-model="dateView">-->
        </div>
        <div class="Results_main">
            <a v-link="{path:'./passengerDetails',query:{id:i.id,carId:i.carId}}" v-for="i in listData">
                <div class="vehicles_list clear_fix">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.dCount}}位</span></p>
                        <p class="price">参考价:￥{{i.dPrice}}</p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center">
                        <p>{{i.dStartStr}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.dEndStr}}</p>
                    </div>
                    <div class="vehicles_right">{{format("hh:ii",i.dDate)}}</div>
                </div>
            </a>

            <div class="Results_more">没有更多数据</div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                searchPar : Object.assign({
                    page : 0,
                    per : 5
                },JSON.parse(sessionStorage.getItem("passengerSearchPar"))),
                listData : [],
                dateList : []
            }
        },
        ready(){
            this.selectDate(this.searchPar.dDate);
            this.dateInit();
            $(".Results_main").on("swipeup",()=>{
                this.pageation();
            })
        },
//        computed : {
//            dateView (){
//                return new Date(this.searchPar.dDate).getTime();
//            }
//        },
        methods : {
            reloadData(){
                this.$set("listData",[]);
                this.queryData();
            },
            queryData(){
                let par = Object.assign({},this.searchPar);
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'driver/queryCar',
                    data : par
                },res=>{
                    this.$set("listData",this.listData.concat(res.result));
                });
            },
            format : eluUtil.dateFormat,
            selectDate(d){
                let date = [],
                    myDate = new Date(d),
                    toDay = parseInt(new Date(this.format("yyyy/mm/dd")).getTime()),
                    myDay = parseInt(myDate.getTime()),
                    i = 0,len = 4,
                    me;
                if(toDay !== myDay){//判断是否今天
                    i = -1;
                    len = 3;
                }
                this.$set("searchPar.dDate",myDay);
                $('#date').mobiscroll('setVal', new Date(myDay));
                for(; i < len; i++){
                    me = eluUtil.setDateDay(myDate,i);
                    date.push({
                        time : parseInt(me.getTime()/1000)*1000,
                        date : eluUtil.dateFormat("mm月dd",me)
                    });
                }
                this.$set('dateList',date);
                this.reloadData();
            },
            dateInit(){
                var now = new Date(),
                        defaultDate = this.searchPar.dDate,
                        maxDate = new Date(now.getFullYear(), now.getMonth()+1, now.getDate(),23,59);
                $('#date').mobiscroll().date({
                    theme: 'mobiscroll',
                    lang: 'zh',
                    display: 'bottom',
                    defaultValue : new Date(defaultDate),
                    minDate: now,
                    maxDate: maxDate,
                    dateOrder: 'MM dd',
                    dateFormat : 'yyyy/mm/dd',
                    rows : 3,
                    onClose : (event, inst) =>{
                        if(new Date(event).getTime() !== this.searchPar.dDate && inst ==='set'){
                            this.selectDate(event);
                        }
                    }
                });
            },
            pageation(){
                this.searchPar.page++;
                this.queryData();
            }
        }
    }
</script>