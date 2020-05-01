<template lang="html">
    <div v-if="groups">
        <gpcard v-for="(item,idx) in p_groups" :key="idx" :gps="item.val.split('-')" />
        <button class="btn" @click="next" v-if="groups.length>4">Next</button>
        <button class="btn" @click="lt" :class="last">Last</button>
    </div>

    <div v-else class="notin">
        去体会旅游的快乐吧！
    </div>
</template>

<script>
import Gpcard from '@/components/group/gpcard.vue'

export default {
    data(){
        return{
            groups:[],
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
        Gpcard
    },
    async mounted(){
        let self = this

        let {status,data:{groups}} = await self.$axios.get('http://localhost:3000/order/all')

        if(status===200){
            self.groups = groups
    }
    },
    computed:{
        
        p_groups:function(){
            let str = this.len.str
            let end = this.len.end
            return this.groups.slice(str,end)
        }
    },
    methods:{
        next:function(){
            let all_len = this.groups.length
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
    background-color: rgb(173, 147, 180);
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
