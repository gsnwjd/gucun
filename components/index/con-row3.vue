<template lang="html">
          <div class="con-row" id="row3">
                <div class="row3-hd">
                       <img :src="item" alt="" v-for="(item,idx) in imgs">
                        <div class="sp0">
                            推荐阅读
                            <span class="sp9 mgl_10"><button @click="change_artis($event)">换一换</button></span>
                        </div>
                    </div>
            <div class="row3-box">
                
                <div class="row3-cube-left" 
                    :class="cls[idx]" v-for="(item,idx) in hotartis" :key="idx"
                    @mouseover="tri_more(idx)" 
                    @mouseleave="tri_more_leave(idx)">
                            <div class="task_left">
                                    <div class="task_head">
                                            <img :src="item.au_head" alt="">
                                        </div>
                                        <div class="task_name">
                                                {{item.author}}
                                            </div>
                                        <div class="task_time">
                                            {{item.time}}
                                        </div>
                            </div>

                            <div class="task_text">
                                <span class="tt_head">
                                        {{item.a_word}}
                                </span>
                                <span class="tt_body"  v-html="item.all_word">
                                </span>
                                <a :href="`/article_one?id=${item.arti_id}`" class="triangle" :class="dis[idx]"></a>
                            </div>
                </div>
               
            </div>
        </div>
        
</template>

<script>
export default {
    data(){
        return{
            cls:["bg1 tx1","bg3 tx2","bg2 tx3","bg5 tx4"],
            imgs:["img/txt1.jpeg","img/txt2.jpeg","img/txt3.jpeg","img/txt5.jpeg"],
            artis:[],
            dis:[{triangle_hover:false},{triangle_hover:false},{triangle_hover:false},{triangle_hover:false}],
            hotartis:[]
            
        }
    },
    async mounted(){
    let self = this
    let {status,data:{artis}} = await self.$axios.get('http://localhost:3000/course/artis')

      if(status===200){
      self.artis = artis
      self.hotartis = artis.length >= 6 ?artis.slice(2,6):artis
    }
    console.log(this.artis)

    },
    methods:{
        change_artis:function(){
            this.hotartis = []
            let artis = this.artis
            let le = artis.length
            let num = []
            let hot = []

            for(let i=0;i<4;i++){
                let num_one = Math.floor(Math.random()*le)
                if(num.indexOf(num_one) === -1){
                    num.push(num_one)
                    hot.push(artis[num[i]])
                }else{
                    i=i-1
                }
                
            }
            this.hotartis = hot
            
        },
        tri_more:function(x){
            // return this.dis[x].triangle_hover = true
        },
        tri_more_leave:function(x){
            // return this.dis[x].triangle_hover = false
        }
    },
   
}
</script>

<style>
/*第三屏*/
#row3{
    height:900px;
    flex-direction: column;
}
.row3-hd{
    width:100%;
    height:180px;
    overflow: hidden;
    float:left;
}
.row3-hd img{
    height:auto;
    width:20%;
    float:left;
}
.row3-box{
    overflow: hidden;
    position: relative;
    height:900px;
    width:100%;
    float:left;
}
.row3-cube-left{
    margin-bottom:5px;
    overflow: hidden;
    padding:20px;
    position: absolute;
    display:flex;
    box-shadow:-3px 3px 1px #dfdfdf;
}
.tx1{
    width:320px;
    height:213px;
    top:20px;
    left:40px;
}
.tx2{
    width:230px;
    height:351px;
    top:60px;
    left:385px;
}
.tx3{
    width:380px;
    height:235px;
    top:110px;
    left:640px;
}
.tx4{
    width:350px;
    height:236px;
    top:460px;
    left:40px;
}
.sp0{
    font-size: 22px;
    font-display: 华文宋体;
    font-weight: 300;
    color:hsl(217, 19%, 68%);
    padding-top:40px;
    float:left;
    width:19%;
    height:130px;
    border-top:1px dashed #9eaabd;
    border-right:4px double #9eaabd;
    text-align: center;
}
.sp0 .sp9{
    font-size: 13px;
}
.sp9 .sp9 a{
    color:#71819b;
}
.bg1{
    background-color: rgba(93, 138, 127, 0.089);
}
.bg2{
    background-color: rgba(156, 68, 168, 0.082);
}
.bg3{
    background-color: rgba(167, 103, 50, 0.11);
}
.bg4{
    background-color: rgba(57, 108, 139, 0.123);
}
.bg5{
    background-color: rgba(192, 211, 224, 0.158);
}
.row3-cube-left .task_left{
    width:80px;
}

.row3-cube-left .task_text{
    width:auto;
    font-size: 13px;
    line-height:23px;
    padding:10px;
    white-space: normal;/*内容超宽后禁止换行显示*/
    overflow: hidden;/*超出部分隐藏*/
}
.row3-cube-left .task_text img{
    height:100px;
    width:auto;
}
.row3-cube-left .task_text .tt_head{
    color:gray;
    font-size: 17px;
    display:block;
    padding-bottom: 22px;
}


.triangle{
    position: absolute;
    right:0;
    top:0;
    height:0;
    display: block;
    border-width: 20px;
    border-style: solid;
    border-color:transparent;
    background-color: transparent;
}
.triangle_hover{
    border-color:#fff #fff rgba(68, 68, 68, 0.253)  rgba(68, 68, 68, 0.253);
}

.row3-cube-left .task_head img{
    width:50px;
    height:50px;
    border-radius: 25px;
    overflow: hidden;
}
.row3-cube-left  .task_name{
    color:#999999;
    font-size: 12px;
    font-weight: bolder;
    text-align: center;
}
.row3-cube-left .task_time{
    margin-top: 5px;
    font-size: 11px;
    border-top:3px solid #77777744;
}

</style>
