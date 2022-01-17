<template lang="html">
<div>
    
    <ul class="ptcard" v-for="(group,idx) in pts" :key="idx">
        <li v-for="(item,idx) in group.course">
            <div class="pt_img">
                <img :src="item.img_src" alt="">
            </div>
            
            <div class="pt_text">
                {{item.title}}<Star :num="4" /><br/>
                <div class="label" v-if="item.label">
                    <span v-for="(label,idx) in item.label">
                        {{label}}
                    </span>
                </div>
                <div class="label" v-else>
                    <span>翻译随行</span>
                    <span>签证无忧</span>
                </div>

                <a :href="`/product?id=${item.id}&&addr=${group.addr}`" class="pro_more">
                    详&nbsp;情
                </a>
            </div>
        </li>
    </ul>
    
</div>    
</template>

<script>
import Auhead from '@/components/public/userhead.vue'
import Star from "@/components/public/star.vue";


export default {
    components: {
      Auhead,
      Star
     },
    props:{
        pts: {
            type: Array,
            default(){
                return []
            }
    }
    },

}
</script>

<style>
.ptcard li{
    height:180px;
    margin-bottom: 10px;
    overflow: hidden;
    display: flex;
    border-radius: 10px;
    border-bottom: 1px dashed rgba(179, 179, 179,0.5);

}
.ptcard .pt_img{
    flex:0.3;
    overflow: hidden;
}
.pt_img img{
    width:110%;
    display: inline-block;
}
.ptcard .pt_text{
    flex:0.7;
    padding:20px;
}
.label{
    font-size: 12px;
    color:#b5b5b5;
}
.label span{
    border-left:2px solid #b5b5b5;
    padding-left:2px;
}
.pro_more{
    height:30px;
    width:70px;
    border-bottom:1px solid #b5b5b5;
    border-radius: 4px;
    background-color: #b5b5b513;
    float:right;
    text-align: center;
    line-height: 30px;
    color:#b5b5b5;
}
</style>
