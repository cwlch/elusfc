<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
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
            <div class="FindCar_Choice">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="text" placeholder="乘车人数"/>
                        <img class="Location img_a" src="../../img/icon_4.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice " type="text" placeholder="10月01日"/>
                        <img class="Location img_b" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>


        </div>
        <div class="Pass_btn">
            <input type="button" value="发布找车信息"/>
        </div>
    </div>




</template>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        }
    }
</script>