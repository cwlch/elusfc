<template>
<div class="Passenger_box">
    <div class="Passenger_seach">
        <dl>
            <dt>
                <img src="../../img/icon_1.png"/>
            </dt>
            <dd>
                <p class="edge">
                    <input type="text" placeholder="北京-昌平区-霍营街道" />
                    <i class="icon"><img src="../../img/icon_2.png"/></i>
                </p>
                <p>
                    <input type="text" placeholder="选择你要去的地方" />
                    <i class="icon"><img src="../../img/icon_2.png"/></i>
                </p>
            </dd>
        </dl>
        <img class="line" src="../../img/icon_3.gif"/>
        <div class="Pass_date">
            <input type="text" id="txt1" placeholder="12月10日(今天)"/>
            <a v-link="{path:'/passenger/Find_car'}"><img src="../../img/icon_3.png"/></a>
        </div>
    </div>
    <div class="Pass_btn">
        <input type="button" value="寻找车辆"/>
    </div>
</div>

</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        ready(){
            let $Calendar = document.getElementById("txt1");
            makeUpCalendar($Calendar);
        }
    }
</script>
