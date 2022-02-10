<template lang="html">
<div class="fl">
    <div id="arti">
            <div class="arti-head">
                        <span>New</span>
                        <span>Hot</span>
                        <ul>
                            <li>{{keyword}}</li>
                        </ul>
            </div>
            <div class="arti-body">
                <ul class="arti-left">
                    <arti v-for="(arti,idx) in artisval.slice(0,ar_len)" :key="idx" :arti="arti" />
                </ul>
                <div class="load_div">
                    <span @mouseenter="more" class="more_arti" v-if="!end_msg">More+</span>
                    <span v-if="end_msg" class="endmsg">{{ end_msg }}</span>
                </div>
            </div>
    </div> 
    <div id="ad">
        <img :src="item" alt="" class="ad-one" v-for="(item,idx) in banner" />
    </div>
</div>        
</template>

<script>
import Arti from '@/components/arti/arti-card.vue'

export default {
    data(){
        return{
            artis:[],
            keyarti:[],
            key:'',
            banners:['img/banner5.jpg','img/banner1.jpg','img/banner2.jpg','img/banner3.jpg','img/banner4.jpg','img/banner6.jpg','img/banner7.jpg','img/banner8.jpg','img/banner9.jpg','img/banner10.jpg','img/banner11.jpg','img/banner12.jpg'],
            ar_len:8,
            end_msg:''
        }
    },
    components:{
    Arti
    },
    async asyncData(ctx){
    let key = ctx.query.key

    let {status,data:{artis}} = await ctx.$axios.get('http://localhost:3000/course/artis')
    let {status:status2,data:{keyarti}} = await ctx.$axios.get('http://localhost:3000/course/keyarti',{
        params:{
          key
        }
      })

      if(status2===200 && status===200){
      console.log('????');
      return{
        keyarti,
        artis,
        key
      }
    }

    },
    computed:{
        artisval:function(){
            if(this.keyarti.length === 0){
                return this.artis
            }else{
                return this.keyarti
            }
        },
        keyword:function(){
            if(this.keyarti.length === 0){
                return `没有包含 ${this.key} 的文章,以下为您推荐`
            }else{
                return this.key
            }
        },
        banner:function(){
            let a = Math.floor(Math.random()*(this.banners.length-3))
            let b = a+3
            return this.banners.slice(a,b)
        }
    },
    methods:{
        more:function(){
            let all_len = this.artisval.length
            if(this.ar_len===all_len){
                this.end_msg = '已全部加载完'
            }else{
                this.ar_len++
            }
            
        }
    }
}
</script>

<style>
.load_div{
    height:50px;
    width:100%;
}
.load_div span{
    float:right;
    font-size: 13px;
}
.load_div .more_arti{
    display:block;
    height:45px;
    width:45px;
    line-height: 44px;
    border-radius:50%;
    box-shadow:1px 3px 2px thistle;
    border:1px solid thistle;
    color:rgb(158, 130, 158);
    text-align: center;
    margin-right: 20px;
    cursor: pointer;
}

.endmsg{
    color:thistle;
}
.fl{
    display: flex;
    justify-content: center;/*元素紧贴，排在中间*/
}

#arti{
    margin-top:10px ;
    flex:0.5;
    border-radius:6px;
    overflow: hidden;
    margin-right:20px;
}
#ad{
    margin-top:10px ;
    flex:0.2;
    border-radius:6px;
    height:700px;
}
#ad .ad-one{
    width:100%;
    margin-bottom:3px;
    border:1px solid rgba(216, 216, 216, 0.301);
}

.arti-head{
    width:100%;
    height:30px;
    padding:10px 0px;
    border-radius: 5px;
    display: flex;
}
.arti-head span{
    flex:0.1;
    text-align: center;
    font-weight: bolder;
    color:rgb(180, 164, 196);
    font-size:18px ;
}
.arti-head span:nth-child(1){
    border-right: 1px solid rgb(180, 164, 196);
}
.arti-head ul{
    flex:1;
    padding-top:3px;
}
.arti-head ul li{
    color:rgb(143, 120, 167);
    float:right;
    text-align: center;
    border:1px dashed rgb(221, 221, 221);
    border-left:2px solid rgb(221, 221, 221);
    margin-right:3px;
    font-size: 14px;
}
.title span{
    font-size: 18px;
    font-weight:500;
    margin-left:10px;
    color:rgb(107, 107, 107);
}
</style>
