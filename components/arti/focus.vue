
<template lang="html">
    <span class="focus_icon" @click="focs">[{{focus.word}}]</span>
</template>

<script>

export default {
    
    async mounted(){
    let self = this
    let au_name = self.au_name

    let {status,data: {user}} = await self.$axios.get('/users/getUser')
    if (status === 200 ) {
      this.username = window.decodeURIComponent(user);
    }
    let {status:status2,data:{code}} = await self.$axios.get('/foc/had',{
            params:{
                au_name
                }
            })

    if(status2===200){
            if(code===0){
                self.focus.word = "已关注"
                self.focus.depen = 0
            }
        }
    },
    
    data(){
        return{
            focus:{
                word:"关注",
                depen:1
            },
            isTrue:110000,
            username:""
        }
    },
    props:["au_name"],
    methods:{
        focs:function(){
            if(this.focus.depen===1){
                this.focus.word = "已关注"
                this.focus.depen = 0
                this.focs_push()

            }else{
                this.focus.word = "关注"
                this.focus.depen = 1
                this.focs_del()
            }
        },
        focs_push:function(){
            let self = this
            let au_name = self.au_name
            self.$axios.post('/foc/focs_push',{au_name}).then(({status,data})=>{
            if(status===200&&data.code===0){
                self.isTrue = 120000
            }})
        },
        focs_del:function(){
            let self = this
            let au_name = self.au_name
            self.$axios.post('/foc/focs_del',{au_name}).then(({status,data})=>{
            if(status===200&&data.code===0){
                self.isTrue = 130000
            }})
        }
    },
    
}
</script>

<style>

</style>
