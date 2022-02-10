<template lang="html">
<div class="pass">

<div class="gpcard">
    <div class="gp img" :style="{backgroundImage:'url('+gps[9]+')'}">
    </div>

    <div class="gp text">
        <div class="title" v-if="gps[8]" :title="gps[8]">{{gps[8]}}</div>
        <div class="time">{{gps[2]}}</div>
        <div class="pro">{{gps[0]}},{{gps[1]}}</div>
    </div>

    <div class="gp price">
        {{gps[4]}}&nbsp;<span>RMB</span>
    </div>

    <div class="gp allprice">
        {{gps[3]*gps[4]}}&nbsp;<span>RMB(总价)</span>
    </div>

</div>
    
</div>
</template>

<script>
export default {
    props:{
        gps: {
            type: Array,
            default(){
                return []
            }
    }
    },
    data(){
        return{
            passenger:1,
        }
    },
    methods:{
        pass_out:function(){
            this.passenger = 0
        }
    }

}
</script>

<style>
.pass{
    position: relative;
}
.pass_info{
    position: absolute;
    line-height: 26px;
    padding:5px;
    left:850px;
    top:90px;
    width:240px;
    height:130px;
    background-color: rgba(235, 216, 235, 0.333);
    font-size: 14px;
}
#pass_ok{
    background-color: rgb(200,200,200);
}
.gpcard{
    display: flex;
    width:95%;
    margin: 0px auto;
    height:200px;
    line-height: 35px;
    text-align: center;
    border:2px solid  rgba(167, 132, 162, 0.192);
    border-radius: 10px;
    margin-top: 10px;
    overflow: hidden;
}
.gpcard .gp{
    flex:0.25;
    font-size: 14px;
    overflow: hidden;
    border-right:1px solid rgb(233, 233, 233);
}
.gp.img{
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.gpcard :nth-child(5){
    border-right:0px solid rgb(233, 233, 233);
}

.gpcard .text{
    flex:0.4;
    font-size: 15px;
}
.gpcard .text .title{
    height: 60px;
    line-height: 25px;
    padding: 10px;
    width: 100%;
    overflow: hidden;
    margin-top: 15px;
    box-sizing: border-box;
    color:#222;
    display: -webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp: 2;
}
.gpcard .text .time{
    color: #999;
    font-size: 13px;
}

.gpcard .price{
    font-size: 22px;
    font-weight: bolder;
    line-height: 170px;
    color:#afafaf;
}
.gpcard .num{
    font-size: 20px;
    color:rgb(155, 155, 155);
    line-height: 85px;
}

.gpcard .allprice{
    font-size: 21px;
    font-weight: bolder;
    line-height: 170px;
}
.gpcard .allprice span,.gpcard .price span{
    font-size: 13px;
    color:#b5b5b5;
}
</style>
