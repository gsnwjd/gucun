<template lang="html">
<span class="star">
    <div class="star_fl" v-if="num==5"><Starval/><Starval/><Starval/><Starval/><Starval/></div>
    <div class="star_fl" v-else-if="num==4"><Starval/><Starval/><Starval/><Starval/></div>
    <div class="star_fl" v-else-if="num==3"><Starval/><Starval/><Starval/></div>
    <div class="star_fl" v-else-if="num==2"><Starval/><Starval/></div>
    <div class="star_fl" v-else="num==1"><Starval/></div>
</span>
</template>

<script>
import Starval from '~/components/public/star_val.vue'
export default {

    components:{
        Starval
    },
    props:['num']

    }
</script>

<style>
.star_fl{
    display: inline-block;
    height:23px;
    width:100px;
    margin-left:10px; 
}
.cls-1{fill:#ffed9d;stroke:#c7b289;stroke-miterlimit:10;}
</style>
