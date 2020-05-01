<template lang="html">
            <a :href="`/article_one?id=${arti.arti_id}`">
                <li class="arti-card move">
                    <div class="title">
                            <auhead :auhead="arti.au_head" :suit="suit" />    
                                <span>
                                    {{arti.author}}
                                </span>
                    </div>
                    <div class="a_word">
                       {{arti.a_word}}
                    </div>
                    <div class="dis_img">
                        <img :src="item" alt="" v-for="(item,idx) in arti.dis_img">
                    </div>
                </li>
            </a>
            <!--
                 
            -->
</template>

<script>
import Auhead from '@/components/public/userhead.vue'

export default {
    components:{
        Auhead
    },
    data(){
        return{
            suit:true
        }
    },
    props: {
    arti: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style>
.arti-card{
    padding:20px 20px;
    height:160px;
    box-shadow: 2px 2px 2px rgb(216, 216, 216);
    border:1px solid rgb(216, 216, 216);
    margin-bottom: 20px;
    margin-left:10px;
}
.arti-card li{
    list-style: none;
}
.move{
    transition: transform 1s linear;
}
.move:hover{
    transform: translate(-2px,0);
}
.arti-card div{
    margin-bottom:15px ;
}
.arti-card .a_word{
    font-size: 15px;
    color:rgb(121, 121, 121);
}
.dis_img{
    height:100px;
}
.dis_img img{
    height:80%;
    float:left;
}


li{
    list-style: none;
}
.dis_flex{
    display: flex;
}

#arti-one{
    flex:0.6;
    margin-top:100px ;
    border-radius:10px;
    overflow: hidden;
    box-shadow: 2px 2px 2px rgb(216, 216, 216);
    border:1px solid rgb(216, 216, 216);
    padding:40px 40px;
}
#arti-one .all_word{
    font-size: 14px;
    line-height: 28px;
}
.all_word img{
    display: block;
    width:70%;
    margin:10px auto ;
}
.title .title-head{
    border-radius: 50%;
    width:30px;
    height:30px;
    overflow: hidden;
    float: left;
}
.title-head img{
    height:60px;
}
.title span{
    font-size: 18px;
    font-weight:500;
    margin-left:20px;
    color:rgb(107, 107, 107);
}
</style>
