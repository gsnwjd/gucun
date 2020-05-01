<template lang="html">
    <a class="fc_one" :href="`pindex?id=${foc.id}`">
        <auhead :auhead="foc.auhead" :suit="suit" class="mg_cen"/>
        <span>{{foc.username}}</span>
    </a>
</template>

<script>
import Auhead from '@/components/public/userhead.vue'

export default {
    props:{
         foc:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    components:{
        Auhead
    },
    data(){
        return{
            suit:false
        }
    }
}
</script>

<style>
.fc_one{
    color:rgba(129, 79, 129, 0.658);
    display: inline-block;
    height:180px;
    width:100px;
    border:1px solid rgba(237, 207, 245, 0.76);
    box-shadow: 1px 1px 1px #ffceff;
    border-radius: 5px;
    margin-left:10px;
    padding:10px;
    position:relative;
}
.fc_one span{
    font-weight: 600;
    font-size: 18px;
    width:100px;
    display:inline-block;
    position: absolute;
    top:140px;
    left:10px;
}
.mg_cen{
    margin: 0px auto;
}
</style>
