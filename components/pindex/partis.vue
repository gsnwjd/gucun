<template lang="html">
    <div v-if="p_artis.length">
        <arti v-for="(arti,idx) in page_artis" :key="idx" :arti="arti" />
        <button class="btn" @click="next" v-if="p_artis.length>4">Next</button>
        <button class="btn" @click="lt" :class="last">Last</button>
    </div>

    <div v-else class="notin">
        快去写下你的第一篇手记吧!
    </div>
</template>

<script>
import Arti from '@/components/arti/arti-card.vue'

export default {
    data(){
        return{
            p_artis:[],
            len:{
                str:0,
                end:4
            },
            last:{
                dis:true
            }
        }
    },
    props:['user'],
    components:{
        Arti
    },
    async mounted(){
        let self = this

        let user = self.user
        let {status,data:{p_artis}} = await self.$axios.get('http://localhost:3000/course/partis',{
            params:{
                user
            }
        })

        if(status===200){
            self.p_artis = p_artis
    }
    },
    computed:{
        page_artis:function(){
            let str = this.len.str
            let end = this.len.end
            return this.p_artis.slice(str,end)
        }
    },
    methods:{
        next:function(){
            let all_len = this.p_artis.length
            if(all_len === this.len.end){
                alert("已无剩余文章")
            }else{
                this.last.dis = false
                if(all_len<this.len.end+4){
                    this.len.end = all_len
                    this.len.str = this.len.str + 4
                }else{
                    this.len.str = this.len.str + 4
                    this.len.end = this.len.end + 4
                }
            }
            
        },
        lt:function(){
            let self = this
            let str = self.len.str
            if(str === 0){
                console.log('not ok')
            }else{
                    self.len.str = (self.len.str - 4)
                    self.len.end = (self.len.str + 4)
                    if(self.len.str===0){
                        self.last.dis = true
                    }
                }
        }
    }
}
</script>

<style>
@font-face {
    font-family: Wanzi;
    src: url("/font/站酷文艺体.otf");
}
.notin{
    height:300px;
    width:500px;
    line-height: 290px;
    border:1px solid rgb(223, 223, 223);
    margin:0px auto; 
    text-align: center;
}
.dis{
    display:none;
}
.btn{
    background-color: rgb(147, 178, 180);
    height:28px;
    width:60px;
    text-align: center;
    line-height: 27px;
    font-size: 17px;
    color:white;
    font-family: Wanzi;
    float:right;
}
</style>
