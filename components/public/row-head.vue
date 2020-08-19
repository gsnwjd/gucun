<template lang="html">
    <div class="row1" id="hd">
        <div class="row1-hd">
            <a href="/" class="in"></a>
            <input type="text" name="find" id="find" v-model="search" @focus="search_icon" @blur="un_search">
            <ul class="find" v-if="search">
                <li>搜索包含&nbsp;<span>{{search}}</span>&nbsp;的文章&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a :href="`/article?key=${search}`">>></a></li>
                <li>搜索包含&nbsp;<span>{{search}}</span>&nbsp;的拼团&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a :href="`/article?key=${search}`">>></a></li>
            </ul>
            <img src="icon/search.png" alt="" class="srch_icon">
            <a href="/" class="li-hd">首页</a>
            <a href="/article" class="li-hd">旅游手记</a>
            <a href="/group" class="li-hd">拼团总入口</a>       
        </div>
            <username/>
    </div> 
</template>

<script>
import Username from '@/components/public/username.vue'
import gsap from 'gsap'

export default {
    components:{
        Username
    },
    data(){
        return{
            search:'',
        }
    },
    methods:{
        search_icon:function(){
            let t2 = gsap.timeline({delay:0.2})
                t2.to(".srch_icon", 0.5, {opacity:1,rotation:0, ease: "power2.inOut" } )
        },
        un_search:function(){
            let t1 = gsap.timeline({delay:0.2})
            t1.to(".srch_icon",0.4 ,{opacity:0.3,rotation:-45,ease:"power2.inOut"})
        }
    }
}

</script>

<style>
/*固定目录*/


#hd{
    width:100%;
    position: fixed;
    top:0px;
    left:0px;
    height:70px;
    display: flex;
    font-size:14px;
} 
.row1-hd{
    background-color: #fff;
    height:70px;
    flex:1;
    overflow: visible;
    align-content: flex-end;
    display: flex;    
    border-bottom: 1px solid rgb(231, 231, 231);
    font-family: Nero;
    position: relative;
}

.find{
    position: absolute;
    left:30%;
    top:80%;
    height:70px;
    width:240px;
    padding-left:10px;
    border:1px solid rgb(206, 206, 206);
    background-color: rgba(255, 255, 255, 0.39);
}
.find li{
    line-height: 34px;
}
.find li span{
    color:rgb(178, 150, 204);
    font-weight: 450;
}
.row1-hd .li-hd{
    flex:0.18;
    background-color: #fff;
    padding-top:25px;
    text-align: center;
    margin-left: 5px;
    overflow: hidden;
    color:#725848;
}
.row1-hd .find li a{
    color:rgb(81, 113, 114);
    text-align: center;
    font-weight:bolder;
    font-size: 13px;
    height:15px;
    width:15px;
    background-color: rgb(243, 243, 243);
    box-shadow: 1px 1px 1px rgb(165, 165, 165);
    border-radius: 50%;
}
.row1-hd .in{
    flex:0.5;
    background: url("/img/logo-gucun.svg") no-repeat;
    background-size:160px 80px;
    background-position: 50px -10px;
    height:100%;
    width:20%;
    float:left;
    margin-left:20px ;
}
.row1-hd img{
    height:25px;
    width:25px;
    background-size: 100% 100%;
    opacity: 0.3;
    transform: rotate(-45deg);
}
.row1-hd input:nth-child(2) {
    background-color: rgba(241, 223, 250, 0.897);
    height:20px;
    width:90%;
    border-radius: 15px;
    display: block;
    position: relative;
    padding:5px 5px 5px 10px;
    margin-top:20px;
    flex:0.7;
}


</style>
