<template>
    <div class="Results">
        <div class="Results_title"><ul>
            <li v-for="i in dateList" :class="{'current' : i.time == searchPar.uDate}" @click="selectDate(i.time)">{{i.date}}</li>
        </ul>
            <img id="date" src="../../img/icon_5.png"/>
        </div>
        <div class="Results_main">
            <a v-link="{path:'./driverDetails',query:{id:i.id,userId:i.userId}}" v-for="i in listData">
                <div class="vehicles_list">
                    <img class="list_img_a" src="../../img/icon_6.png"/>
                    <div class="vehicles_left marginTop">
                        <p class="seat"><img class="list_img_b" src="../../img/icon_7.png"/><span>{{i.uCount}}位</span></p>
                        <p class="date"><b>更新时间:{{format("mm-dd",i.createTime)}}</b></p>
                    </div>
                    <img class="ve_line" src="../../img/icon_8.gif"/>
                    <div class="vehicles_center v_top">
                        <p>{{i.uStartStr}}</p>
                        <p class="center"><img src="../../img/icon_9.png"/></p>
                        <p>{{i.uEndStr}}</p>
                    </div>
                    <div class="vehicles_right">{{format("hh:ii",i.uDate)}}</div>
                </div>
            </a>
            <div class="Results_more" v-text="queryTxt"></div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                queryTxt : '正在查询...',
                searchPar : Object.assign({
                    page : 0,
                    per : 5,
                    uStatus : 0
                },JSON.parse(sessionStorage.getItem("driverSearchPar"))),
                listData : [],
                dateList : []
            }
        },
        ready(){
            this.selectDate(this.searchPar.uDate);
            this.dateInit();
            this.setMainHeight();
        },
        methods : {
            queryData(){
                this.$set("queryTxt","正在查询...");
                eluUtil.jsonp({
                    url : eluConfig.serverPath + 'user/queryRequire',
                    data : this.searchPar
                },res=>{
                    if(res.result.length <= 0){
                        this.$set("queryTxt","没有更多数据");
                    }else{
                        this.$set("queryTxt","下拉查看更多");
                    }
                    this.$set("listData",this.listData.concat(res.result));
//                    this.$set("listData",res.result);
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
                this.$set("searchPar.uDate",myDay);
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
                        defaultDate = this.searchPar.uDate,
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
                        if(new Date(event).getTime() !== this.searchPar.uDate && inst ==='set'){
                            this.selectDate(event);
                        }
                    }
                });
            },
            setMainHeight(){
                let wH = $(document).height(),
                        tH = $(".Results_title").height() + 10,
                        bH = $(".menu").height(),
                        mH = wH - tH - bH;
                $(".Results_main").height(mH).css('margin-top',tH);
            }
        }
    }
</script>