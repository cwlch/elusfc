<template>
    <div class="Driver_details">
        <div class="details_port">
            <span><img src="../../img/pro.jpg"/></span>
            <dl>
                <dt>Chen Hui Hui</dt>
                <dd><b class="pink">信誉度70%</b><b class="mar">乘坐次数:70次</b></dd>
            </dl>
            <a class="ck" v-link="">查看详情</a>
        </div>
        <div class="details_infor">
            <ul>
                <li class="title">
                    <span>出发日期：</span>
                    <span>10-01</span>
                    <span>10:00</span>
                    <b>10:05</b>
                    <b>09-28</b>
                    <b>最后更新:</b>
                </li>
                <li class="cho">
                    <span>
                        <img src="../../img/icon_10.png"/>
                    </span>
                    <p>邵阳-城步-白茅坪</p>
                    <p>深圳-龙岗-平湖区</p>
                </li>
                <li class="moeny">
                    <b>可坐人数：6位</b>
                </li>
                <li class="Explain">
                    乘客说：如果有会开车有驾照的朋友，一起乘车，价
                    格可以优惠一半哦！赶紧联系我把。
                </li>
            </ul>
        </div>
        <div class="Pass_btn">
            <input type="button" tel="17744563689" value="联系他"/>
        </div>
        <div class="details_introduce">请说明您是在E鹿顺风车平台看到的哦！</div>
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