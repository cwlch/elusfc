<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <input placeholder="您从哪儿出发?" readonly v-link="{path:'/address',query:{source:'passenger_release',type:'start'}}" v-model="savePar.uStartStr"/>
                    <input placeholder="您要去哪儿?" readonly v-link="{path:'/address',query:{source:'passenger_release',type:'end'}}" v-model="savePar.uEndStr"/>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="FindCar_Choice">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="tel" v-model="savePar.uCount" placeholder="乘车人数"/>
                        <img class="Location img_a" src="../../img/icon_4.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice" v-model="savePar.uDate" type="text" placeholder="10月01日"/>
                        <img class="Location img_b" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te" v-model="savePar.remark" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>
        </div>
        <a class="button" @click="save()">发布找车信息</a>
    </div>




</template>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{
                savePar : {
                    uStartStr : '您从哪儿出发',
                    uEndStr : '您要去哪儿?',
                    uStart : '',
                    uEnd : '',
                    uCount : '',
                    uDate : '',
                    remark : ''
                }
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('passenger_release_start_address')),
                    end = JSON.parse(localStorage.getItem('passenger_release_end_address'));
            if(start){
                this.$set("savePar.uStartStr",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
                this.$set('savePar.uStart',start.street.id);
            }
            if(end){
                this.$set("savePar.uEndStr",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
                this.$set('savePar.uEnd',end.street.id);
            }
        },
        methods : {
            save (){
                let par = Object.assign({
                    userId : '044232',
                },this.savePar,{
                    uDate : new Date(this.savePar.uDate).getTime() /1000
                });
                if(!par.uStart){
                    eluUtil.tipsMod("出发地点不能为空哦!");
                    return false;
                }
                if(!par.uEnd){
                    eluUtil.tipsMod("目的地点不能为空哦!");
                    return false;
                }
                if(!par.uCount){
                    eluUtil.tipsMod("乘坐人数不能为空!");
                    return false;
                }
                if(!par.uDate){
                    eluUtil.tipsMod("时间不能为空!");
                    return false;
                }
                if(!par.remark){
                    eluUtil.tipsMod("备注不能为空!");
                    return false;
                }

                $.ajax({
                    url : eluConfig.serverPath + 'user/publishRequire',
                    type : 'get',
                    dataType : "jsonp",
                    data : par,
                    success : function (data) {
                        if(data.retCode == '200'){
                            alert("我成功了");
                        }
                    }
                });
//                eluUtil.jsonp({
//                    url : eluConfig.serverPath + 'user/publishRequire',
//                    data : par
//                }, function(res){
//                    if(res.retCode == '200'){
//                        eluUtil.tipsMod("成功")
//                    }
//                })
            }
        }
    }
</script>