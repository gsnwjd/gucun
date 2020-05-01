<template lang="html">
    <div v-if="focus" id="foc_coll">
        <focusone v-for="(foc,idx) in focus" :key="idx" :foc="foc" />
    </div>

    <div v-else class="notin">
        <span v-if="isbr">你</span>
            <span v-else>Ta</span>
            还没有关注的人哦
    </div>
</template>

<script>
import Focusone from '@/components/focus/focus-one.vue'

export default {
    data(){
        return{
            focus:""
        }
    },
    props:['user','isbr'],
    components:{
        Focusone
    },
    async mounted(){
        let self = this
        let {status,data} = await self.$axios.get('/foc/getfocus',{params:{
            user:self.user
        }})
        if(status===200 && data.code===0){
            self.focus = data.focs
        }
    },
    computed:{

    },
    methods:{
        
    }
}
</script>

<style>
#foc_call{
    height:800px;
    width:400px;
}
</style>
