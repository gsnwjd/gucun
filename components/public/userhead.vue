<template lang="html">
<div :class="{headimg:suit,bigheadimg:nosuit}" :style="{backgroundImage: bg}"></div>
</template>

<script>
export default {
    props:['auhead','suit'],
    computed:{
      bg:function(){
          return `url(${this.auhead})`
    },
    nosuit:function(){
      if(this.suit){
        return false
      }else{
        return true
      }
    }
  }
}
</script>

<style>
.headimg{
    border-radius: 50%;
    width:36px;
    height:36px;
    overflow: hidden;
    float: left;

    background-repeat: no-repeat;
    background-size: auto 150%;
    background-position:50% 50%;
}

.bigheadimg{
    border-radius: 50%;
    width:70px;
    height:70px;
    overflow: hidden;
    float: left;

    background-repeat: no-repeat;
    background-size: auto 140%;
    background-position:50% 50%;
}
</style>
