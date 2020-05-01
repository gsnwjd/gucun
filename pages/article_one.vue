<template lang="html">
<div id="arti-one" v-model="arti">
        <div class="title">
            <auhead :auhead="arti.au_head" :suit="suit"/>
            <span>{{arti.author}}</span>
            <focus :au_name="arti.author"></focus>
            <like :au_name="arti.author" :arti_id="arti.arti_id"/>
        </div>
        <br/>
        <div class="a_word">{{arti.a_word}}</div>
        <div class="all_word" v-html="arti.all_word"></div>
</div>
</template>

<script>
import Auhead from '@/components/public/userhead.vue'
import Like from '@/components/arti/like.vue'
import Focus from '@/components/arti/focus.vue'

export default {
    data(){
        return{
            arti:{},
            suit:true
        }
    },
    components:{
        Auhead,
        Like,
        Focus
    },
    async asyncData(ctx){
      let id = ctx.query.id
      let {status,data:{arti}} = await ctx.$axios.get('http://localhost:3000/course/arti',{
        params:{
          id
        }
      })

      if(status===200){
      return{
        arti
      }
    }
}
}
</script>

<style>

.mg_center{
    justify-content: center;/*元素紧贴，排在中间*/
}
.dis_flex{
    display: flex;
}
#arti-one{
    width:70%;
    margin: 30px auto;
    overflow: hidden;
    border:1px solid rgba(228, 220, 228, 0.582);
    border-top:none;
    border-bottom:none;
    padding:40px 40px;
}
#arti-one .a_word{
    margin-bottom:20px;
    color:rgb(136, 150, 150);
}
#arti-one .all_word{
    font-size: 14px;
    line-height: 28px;
}
.title span{
    display: inline-block;
    font-size: 18px;
    font-weight:500;
    margin-left:20px;
    margin-top:5px; 
}
.title .focus_icon{
    color:#b5b5b5;
    font-size: 12px;
    font-weight: bolder;
}
.all_word img{
    display: block;
    width:70%;
    margin:10px auto ;
}

</style>
