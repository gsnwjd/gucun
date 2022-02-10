<template lang="html">
        <div class="con-row" id="row1">
            <a href="" @click.prevent="test()">测试</a>
            <span href="" @click.stop="test()">测试</span>
            <div class="row1-bd">
                <div class="row1-left">
                    <div>
                        <ul>
                            <li v-for="(item,idx) in leftimgs" :key="idx">
                                <img :src="item" alt="">
                                <div class="row1-img-alpha"></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row1-right">
                    <div class="cube">
                        <ul>
                            <li v-for="(item,idx) in rightimgs" :key="idx">
                                <img :src="item" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row1-t">
                    <div class="row1-t-one">
                        <a href="/group" class="r-txt" v-for="(item,idx) in title_text">
                        {{ item }}
                        </a>
                    </div>  
                </div>
                <a href="#" id="more">
                        More&nbsp;+
                </a>
            </div>
        </div>
</template>

<script>
export default {
    data(){
        return{
            leftimgs:["img/dongj03.jpeg","img/bali2.jpeg","img/course12.jpeg","img/eg3.jpeg","img/txt3.jpeg","img/dongj03.jpeg"],
            rightimgs:["img/cube1.jpeg","img/course6.jpeg","img/spain2.jpeg","img/eg1.jpeg","img/spain3.jpeg","img/cube1.jpeg"],
            title_text:[
                "日本北海道-仙台-东京9日自由行",
                "马尔代夫-迪拜8晚10日自由行",
                "巴厘岛金巴兰海滩5晚6包车自由行",
                "埃及游轮10-11日游/含阿布辛贝帝王谷",
                "西班牙+葡萄牙13-14日游全含4/5星0购物0自费,葡萄牙深度3天",



                "日本北海道-仙台-东京9日自由行"
            ]
        }
    },
    mounted(){
        document.getElementById('row1').addEventListener('click',function(){
            console.log('fufufufuf')
        })
        require('@/assets/js/con1-ani.js')
    },
    methods:{
        test(){
            alert('before');
        }
    }
}
</script>

<style>
.row1-bd{
    flex:1.1;
    display: flex;
    justify-content: center;
    position: relative;
}
.row1-left{
    flex:0.52;
    overflow: hidden;
}
.row1-left{
    flex:0.52;
    overflow: hidden;
}
.row1-left div{
    width:540px;
    height:562px;
    overflow: hidden;
}
.row1-left ul{
    width:3600px;
}
.row1-left li{
    height:562px;
    width:540px;
    float:left;
    overflow: hidden;
    position: relative;
}
.row1-left li img{
    width:590px;
    height:auto;
    /*filter: blur(0px*/
}

.row1-img-alpha{
    position: absolute;
    left:540px;
    top:0px;
    width:545px;
    height:100%;
    background-color: rgb(255, 255, 255);
}



#more{
    position: absolute;
    right:80px;
    top:480px;
    height:44px;
    width:120px;
    text-align: center;
    font-size: 32px;
    font-family: Century;
    background-color:rgb(168, 141, 141);
    color:#ffffff;
    border-radius: 0px 22px 22px 0px;
    transition: transform 5s;
}
#more:hover{
    transform: translate(0,-15px);
}

.row1-right{
    flex:0.4;
    display: flex;
    justify-content: center;
}
.row1-t{
    font-size:36px;
    position: absolute;
    right:0px;
    top:355px;
    height: 46px;
    font-family: 华文宋体;
    text-shadow: 0px 0px 4px rgb(161, 161, 161);/*左，上，大小以及颜色*/
    text-align: center;
    overflow: hidden;
    text-align: center;
}
.row1-t-one{
    height:132px;
}
.row1-t a{
    height:46px;
    overflow: hidden;
    display: block;
}

.cube{
    height:300px;
    overflow: hidden;
    flex:0.45;
    margin-top: 80px;
    position: relative;
}
.cube ul{
    height:300px;
    width:2500px;
    position: absolute;
}
.cube li{
    height:300px;
    width:223px;
    position: relative;
    overflow: hidden;
    float:left;
}
.cube img{
    height:300px;
    width:auto;
    position: absolute;
    left:0px;
    top:0px;
}


</style>