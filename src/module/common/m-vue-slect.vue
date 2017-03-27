<template>
    <div class="m-vue-slect">
        <select v-model="vModel" >
            <option v-for="i in optList" value="{{i[valKey]}}">{{i[nameKey]}}</option>
        </select>
        <span>{{selectedName}}</span>
        <i></i>
    </div>
</template>
<style>
</style>
<script>
    export default{
        data(){
            return{
                selectedName : ''
            }
        },
        ready(){
        },
        props:['optList','valKey','nameKey','vModel','placeholder'],
        computed : {
            'selectedName' (){
                let name;
                for(let i of this.optList){
                    if(i[this.valKey] == this.vModel){
                        name = i[this.nameKey];
                        break;
                    }
                }
                if(!name){
                    name = this.placeholder;
                }
                return name;
            }
        },
        methods:{
            selectedVal(){
                this.$emit("change")
            }
        }
    }
</script>