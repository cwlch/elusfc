<template>
    <div class="Results">
        <div class="Results_title"><ul>
            <li v-for="i in dateList" :class="{'current' : i.time == searchPar.dDate}" @click="selectDate(i.time)">{{i.date}}</li>
        </ul>
            <img id="date" src="../../img/icon_5.png"/>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./driverDetails',query:{id:i.id}}" v-for="i in listData">
                <div class="vehicles_list">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left marginTop">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.uCount}}位</span></p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center v_top">
                        <p>{{i.uStart}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.uEnd}}</p>
                    </div>
                    <div class="vehicles_right">{{format("hh:ii",i.uDate)}}</div>
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
                },JSON.parse(sessionStorage.getItem("driverSearchPar"))),
                listData : [],
                dateList : []
            }
        },
        ready(){
            this.selectDate(this.searchPar.uDate);
            this.dateInit();
        },
        methods : {
            queryData(){
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : this.searchPar
                },res=>{
                    this.$set("listData",res.result);
                });
            },
            reloadData(){
                this.$set("listData",[]);
                this.queryData();
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
            }
        }
    }
</script>