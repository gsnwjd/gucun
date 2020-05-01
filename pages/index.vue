<template>
<div id="con">
    <conrow1></conrow1>
    <conrow2></conrow2>
    <conrow3></conrow3>
</div>
</template>

<script>
import conrow1 from '~/components/index/con-row1.vue'
import conrow2 from '~/components/index/con-row2.vue'
import conrow3 from '~/components/index/con-row3.vue'

export default {
    components: {
        conrow1,
        conrow2,
        conrow3
  }
}
</script>

<style>
body *{
    margin:0;
    padding:0;
    border:0;
}
body{
    margin:0;
    padding:0;
    border:0;
}
a{
    text-decoration: none;
}
#con{
    width:85%;
    margin: 0px auto;
}
.con-row{
    height:580px;
    width:100%;
    /*background-color:rgb(253, 225, 174);*/
    margin-bottom: 20px;
    display:flex;
}</style>
