<template lang="html">
<div class="fl">

    <div id="group">

        <div class="group-body">

            <div class="areas" id="all">
            <ul class="type">
                <li :class="`ar${idx} posi${idx}`" v-for="(item,idx) in areas" @mouseover="over(idx)">
                    <span>{{item}}</span>
                </li>
            </ul>
            <div class="dest" v-if="dest_val">
                <div class="posi0" v-if="posi[0]" @mouseleave="left(0)">马尔代夫<br/>
                    基础岛屿<br/>
                    班度士岛|天堂岛|绚丽岛|艾雅度岛
                    优质岛屿<br/>
                    美人蕉|安嘎嘎岛|瑞提法鲁岛|圣塔拉富士岛|瓦度岛|蕉叶岛|椰子岛|康杜玛岛|双鱼岛<br/>
                    豪华岛屿<br/>
                    奥静岛|康迪玛岛|卡帕蒂姆|美露丽芙岛|诺库岛|伊露岛<br/>
                    卡尼富士岛|满月岛|卡尼岛|可可波杜希蒂岛|吉哈德岛
                    轻奢岛屿<br/>
                    奥瑞格岛|铂尔曼岛|瑞僖敦迪鼓拉岛|莫凡彼岛|莉莉岛|阿雅达岛|神仙岛|菲诺娜岛<br/>
                    喜天阙岛玛法鲁岛奥臻岛魔富士岛港丽岛薇拉瓦鲁岛法茹馥士岛
                    奢华岛屿<br/>
                    卓美亚维塔利岛|翡诺岛|宁静岛|阿米拉岛|华尔道夫岛|香格里拉岛|芙花芬岛|四季库达岛<br/>
                    第六感拉姆岛|尼亚玛岛
                    至尊岛屿<br/>
                    LV白马兰德利岛|维拉私人岛|索尼娃尼岛|沃木里瑞吉岛|姬丽兰坎富士岛<br/>
                    四季兰达岛|瑞提拉岛|娇丽岛
                </div>
                <div class="posi1" v-if="posi[1]" @mouseleave="left(1)">
                    欧洲<br/>
                    法国|瑞士|意大利|英国|荷兰|德国|比利时|奥地利|西班牙|俄罗斯
                    美洲<br/>
                    阿拉斯加|加拿大|纽约|洛杉矶|旧金山|西雅图|阿根廷|智利|古巴
                </div>
                <div class="posi2" v-if="posi[2]" @mouseleave="left(2)">
                    日本<br/>
                    东京|北海道|日本|大阪|京都|冲绳|福冈|富山|鹿儿岛<br/>
                    宫崎|长崎|神户|东京迪士尼乐园|仙台<br/>
                    东北亚<br/>
                    乌兰巴托|蒙古
                </div>
                <div class="posi3" v-if="posi[3]" @mouseleave="left(3)">
                    东南亚<br/>
                    巴厘岛|芽庄|老挝|越南|吉隆坡|新加坡
                    泰国<br/>
                    普吉岛|清迈|曼谷|甲米|苏梅岛|皇帝岛|沙美岛
                    南亚<br/>
                    尼泊尔|斯里兰卡|印度
                    中西亚<br/>
                    乌兹别克斯坦|土库曼斯坦|亚美尼亚|阿塞拜疆|格鲁吉亚|卡塔尔
                </div>
                <div class="posi4" v-if="posi[4]" @mouseleave="left(4)">
                    港澳<br/>
                    香港迪士尼乐园|海洋公园|铜锣湾|香港维多利亚港|澳门<br/>
                    台湾<br/>
                    台北故宫博物馆|日月潭|阿里山|垦丁国家公园|淡水老街|中正纪念堂<br/>
                    台北|太鲁阁公园|清境农场|花莲

                </div>
                <div class="posi5" v-if="posi[5]" @mouseleave="left(5)">
                    澳大利亚|新西兰|悉尼|凯恩斯|墨尔本|布里斯班<br/>
                    福克斯冰川|瓦努阿图|基督城|奥克兰
                </div>
                <div class="posi6" v-if="posi[6]" @mouseleave="left(6)">
                    迪拜|埃及|南非|肯尼亚|摩洛哥<br/>
                    土耳其|阿拉伯联合酋长国
                </div>
            </div>

            <div class="pt new">最新</div>
            <div class="pt hot">最热</div>
            </div>

            <div class="all_pt">
                <ptcard id="ptcard" :pts="group"></ptcard>
            </div>
        </div>

    </div> 
    
</div>        
</template>

<script>
import Ptcard from '@/components/group/ptcard.vue'

export default {
  components:{
      Ptcard
    },
  mounted() {
    require("@/assets/js/gp-ani.js");
  },
  layout: "usual",
  data() {
    return {
      dest_val: false,
      posi: [0, 0, 0, 0, 0, 0],
      areas: [
        "马尔代夫",
        "欧洲/美洲",
        "日本",
        "东南亚/南亚/泰国",
        "中国港澳/中国台湾",
        "澳大利亚/新西兰",
        "中东/非洲"
      ],
      group:{},
      board:'目前已经开通如下路线'
    }
  },
  methods: {
    over: function(id) {
      this.dest_val = true;
      this.posi[id] = 1;
    },
    left: function(id) {
      this.dest_val = false;
      this.posi[id] = 0;
    }
  },
    async asyncData(ctx){
      let {status,data:{group}} = await ctx.$axios.get('http://localhost:3000/course/group')

      if(status===200){
      return{
        group
      }
    }
    }
};
</script>

<style>
.fl {
  display: flex;
  justify-content: center; /*元素紧贴，排在中间*/
}

#group {
  margin-top: 10px;
  flex: 0.85;
  overflow: hidden;
}
.all_pt{
    padding-top: 10px;
    width:100%;
}

.areas {
  position: relative;
  height: 400px;
  border-bottom: 1px dashed rgba(179, 179, 179,0.5);
}
.areas .type {
  position: relative;
}
.areas .type li {
  position: absolute;
  border-radius: 50%;
  text-align: center;
  font-size: 13px;
  background-repeat: no-repeat;
  background-size: auto 150%;
  background-position: 50% 0%;
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.13);
  opacity: 0;
}
.areas .type li span {
  background-color: #fff;
}
.ar0 {
  height: 150px;
  width: 150px;
  line-height: 150px;
  color: cadetblue;
  background-image: url("/img/cana6.jpeg");
}
.posi0 {
  left: 20px;
  top: 20px;
}
.ar1 {
  height: 200px;
  width: 200px;
  line-height: 200px;
  color: rgb(110, 101, 49);
  background-image: url("/img/course12.jpeg");
}
.posi1 {
  left: 220px;
  top: 0px;
}
.ar2 {
  height: 110px;
  width: 110px;
  line-height: 110px;
  color: rgb(129, 80, 136);
  background-image: url("/img/dongj02.jpeg");
}
.posi2 {
  left: 450px;
  top: 10px;
}
.ar3 {
  height: 170px;
  width: 170px;
  line-height: 170px;
  color: rgb(85, 93, 136);
  background-image: url("/img/thai05.jpeg");
}
.posi3 {
  left: 720px;
  top: 0px;
}
.ar4 {
  height: 130px;
  width: 130px;
  line-height: 130px;
  color: rgb(110, 49, 49);
  background-image: url("/img/course14.jpeg");
}
.posi4 {
  left: 120px;
  top: 180px;
}
.ar5 {
  height: 180px;
  width: 180px;
  line-height: 180px;
  color: rgb(110, 101, 49);
  background-image: url("/img/swiss7.jpeg");
}
.posi5 {
  left: 950px;
  top: 30px;
}
.ar6 {
  height: 200px;
  width: 200px;
  line-height: 200px;
  color: rgb(73, 106, 121);
  background-image: url("/img/eg1.jpeg");
}
.posi6 {
  left: 520px;
  top: 100px;
}

.areas .dest {
  position: relative;
  top: 30px;
  width: 100%;
  height: 500px;
}
.areas .dest div {
  font-size: 13px;
  line-height: 23px;
  color: rgb(83, 83, 83);
  position: absolute;
  border: 1px solid rgb(187, 187, 187, 0.8);
  padding: 3px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.95);
}
.opa-1 {
  opacity: 1;
}

.pt{
    height:25px;
    line-height: 25px;
    width:60px;
    text-align: center;
    position: absolute;
    bottom:0px;
    font-size: 13px;
    opacity: 0;
}
.new{
    left:0px;
    background: linear-gradient(to right,rgb(255, 190, 190),rgb(255, 239, 195));
}
.hot{
    left:70px;
    background: linear-gradient(to right,rgb(190, 229, 255),rgb(255, 195, 247));
}
#ptcard{
  opacity: 0;
}
</style>
