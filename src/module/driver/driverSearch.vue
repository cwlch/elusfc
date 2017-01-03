<template>
    <div class="FindCar_box">
        <div class="FindCar_seach">
            <dl class="check">
                <dt>
                    <img src="../../img/icon_1.png"/>
                </dt>
                <dd>
                    <a href="javascript:;" v-link="{path:'/address',query:{source:'driver_release',type:'start'}}">{{startAddressName}}</a>
                    <a href="javascript:;" v-link="{path:'/address',query:{source:'driver_release',type:'end'}}">{{endAddressName}}</a>
                </dd>
            </dl>
            <img class="line" src="../../img/icon_3.gif"/>
            <div class="FindCar_Choice">
                <ul>
                    <li class="Location_to left">
                        <input class="Choice" type="text" placeholder="还剩几个座位"/>
                        <img class="Location img_c" src="../../img/icon_11.png"/>
                    </li>
                    <li class="Location_to right">
                        <input class="Choice " type="text" placeholder="收费多少呢"/>
                        <img class="Location img_d" src="../../img/icon_12.png"/>
                    </li>
                    <li  class="Location_to enter">
                        <input class="newDate" type="text" placeholder="2017年01月10  19:00"/>
                        <img class="Location img_d" src="../../img/icon_3.png"/>
                    </li>
                </ul>
            </div>
            <img class="line" src="../../img/icon_3.gif"/>
            <textarea class="FindCar_te" placeholder="有孕妈小宝贝、萌宠，记得提前告诉车主哦"></textarea>


        </div>
        <div class="Pass_btn">
            <input type="button" value="发布找人信息"/>
        </div>
    </div>




</template>
<script>
    export default{
        data(){
            return{
                startAddressName : '您从哪儿出发?',
                startAddressVal : '',
                endAddressName : '您要去哪儿?',
                endAddressVal : ''
            }
        },
        ready(){
            let start = JSON.parse(localStorage.getItem('driver_release_start_address')),
                end = JSON.parse(localStorage.getItem('driver_release_end_address'));
            if(start)this.$set("startAddressName",`${start.city.name} - ${start.county.name} - ${start.street.name}`);
            if(end)this.$set("endAddressName",`${end.city.name} - ${end.county.name} - ${end.street.name}`);
        }
    }
</script>