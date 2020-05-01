<template lang="html">
<div class="like sp" :class="bg" @click="like" v-if="user_is && user_load">
    <p v-if="!coll">{{had}}</p>
    <p v-else>{{coll}}</p>
</div> 
</template>

<script>

export default {
    async mounted(){
    let self = this
    let id = self.arti_id

    let {status,data: {user}} = await self.$axios.get('/users/getUser')
    if (status === 200) {
      this.username = window.decodeURIComponent(user);
    }


    let {status:status2,data} = await self.$axios.get('/arti/had',{
            params:{
                id
                }
            })

    if(status2===200){
            self.had = data.had
            if(data.code===0){
                self.bg.yes=true
                self.bg.no=false
            }
        }

    },
    props:['au_name','arti_id'],
    data(){
        return{
            coll:'',
            bg:{
                no:true,
                yes:false
            },
            username:'',
            had:'收藏'
        }
    },
    methods:{
        like:function(){
            let self = this
            let id = self.arti_id

        if(this.bg.no){
            self.$axios.post('/arti/pusharti',{id}).then(({status,data})=>{
            if(status===200&&data.code===0){
                self.coll = data.msg
            }})
                self.bg.no = false
                self.bg.yes= true
        }       
        else{
            self.$axios.post('/arti/delarti',{id}).then(({status,data})=>{
            if(status===200&&data.code===1){
                self.coll = data.msg
            }})

                self.bg.no = true
                self.bg.yes= false
            }
        }
    },
    computed:{
        user_is:function(){
            if(this.username === this.au_name){
                return false
            }else{
                return true
            }
        },
        user_load:function(){
            if(this.had===4){
                return false
            }else{
                return true
            }
        }
    }
}
</script>

<style>
.like{
    height:20px;
    width:50px;
    float:right;
    padding-top:20px;
    background: transparent;
    background-repeat: no-repeat;
    background-size:60% auto;
    background-position-x:50%; 
    box-shadow: 1px 1px 1px 1px #f0f0f0;
    border-radius:4px;
    text-align: center;
    overflow: hidden;
}
.like p{
    font-size: 12px;
    width:48px;
}
.yes{
    background-image: url("/icon/hh.svg");
    background-color: rgba(255, 234, 234, 0.712);
}
.no{
    background-image: url("/icon/no.svg");
}
</style>
