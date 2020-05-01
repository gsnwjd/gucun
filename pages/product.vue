<template lang="html">
    <div id="product" v-model="course">
        <div class="pro_title">
            <span>{{course.title}}</span>
            <span class="mgl_20">推荐指数:<Star :num="course.star" /></span><br/>
        <ul>
            <li v-for="(item,idx) in course.label">{{item}}</li>
        </ul>
        </div>
        <div class="pro_body1">
                <div class="pro_display">
                    <div class="disbody">
                        <img v-for="(item,idx) in course.img_src" :src="item" alt="">
                    </div>
                  
                </div>
                <a href="#" class="pro_last">
                    <
                </a>
                <a href="#" class="pro_next" @click="next">
                    >
                </a>
                <div class="pro_text mgl_30">
                    <p>
                        独立成团 · 透明行程 · 食宿无忧 · 严选导游
                    </p>
                    <p>总价:
                        <span class="sp1">{{course.price}}</span>&nbsp;起
                        <span class="sp2 mgl_20">满意度:</span>
                        <span class="sp3">99%</span>

                        <span class="sp4 mgl_20">拼团人数/出游人数:</span>
                        <span class="sp5">{{course.p_num}}/{{course.p_all_num}}</span>

                    </p>
                    <p>
                        <span class="sp4">首付出发:</span>
                        <span class="sp5 mgl_30">￥{{num1}}起+￥{{num2}}*12 5种分期 最高六期免息</span>
                        <a href="" class="sp6 mgl_20">查看更多</a>
                    </p>

                    <p>
                        <span class="sp4">出发城市:</span>
                            <select class="r_pros mgl_30" v-model="idx">
                                <option v-for="(item,idx) in $store.state.city.city" :value="idx">
                                    {{ item.province }}
                                </option>
                            </select>
                
                            <select class="r_city" v-model="city">
                                <option v-for="(item,idx) in cur_cities">
                                    {{ item.name }}
                                </option>
                            </select>
                    </p>

                    <p>
                        <span class="sp4">出游日期:</span>

                          <span class="mgl_30">  <el-date-picker
                              v-model="list_date"
                              type="date"
                              size="mini"
                              placeholder="选择日期时间"/>
                          </span>    
                    </p>
                    
                    <p>
                        <span class="sp4">出游人数:</span>
                        <span class="numpick mgl_30">
                          <el-input-number v-model="list_num" size="mini" :min="1" :max="6"></el-input-number>
                        </span>
                        
                    </p>
                    <p>
                        <span class="sp8"><a href="" @click="orderin">立即预定</a></span>
                        
                        <!--<span class="sp8"><a :href="`/order?id=${orderid}`">立即预定</a></span>-->
                    </p>
                </div>
        </div>
        <div class="pro_body2">
            <div class="pro_body2_menu">
                <div class="body2">
                    <a href="#">优惠</a>
                    <a href="#">特色</a>
                    <a href="#">费用说明</a>
                    <a href="#">总线路</a>
                    <a href="#">相关手记</a>
                </div>
            </div>
            <div class="pro_body2_detail">
                
            </div>
        </div>
    </div>
</template>

<script>
import Star from "@/components/public/star.vue";
import gsap from "gsap"

export default {
  components: {
    Star
  },
  data() {
    return {
      course: [],
      idx: 1,
      city:'',
      list_date: '',
      list_num:1,
    };
  },
  methods:{
      next:function(){
          let t2 = gsap.timeline()
            t2.to( '.pro_display .disbody', 3, { x:-220}) 
      },
      
      orderin:function(){
          let self = this
          let id = this.orderid
          let pro = this.$store.state.city.city[self.idx].province
          
          self.$axios.post('/order/in',{
            orderval:`${pro}-${self.city}-${self.list_date}-${self.list_num}-${self.course.price}-${self.course.img_src[1]}-${self.course.id}-${self.areaid}-${self.course.title}`,
            id:id
      }).then(({status,data})=>{
        if(status===200){
          if(data.code===1){
            location.href=`/order?id=${id}`
          }else{
            self.error=`出错`
          }
        }else{
          self.error=`服务器出错`
        }})
      }
  },
  computed: {
    cur_cities: function() {
      let idx = this.idx;
      return this.$store.state.city.city[idx].cities;
    },
    num1: function() {
      let num1 = (this.course.price * 0.08).toFixed(2);
      return num1;
    },
    num2: function() {
      let num2 = ((this.course.price * 0.92 * 1.07) / 12).toFixed(2);
      return num2;
    },
    orderid:function(){
      let num_id=''
      let char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNLOPRSTUVWXYZ1234567890'.split("")
      for(let i=0;i<10;i++){
        let x = Math.floor(Math.random()*(char.length))
        num_id = char[x]+num_id
      }
      return num_id
      },
  },
  async asyncData(ctx) {
    let self = this
    let addr = ctx.query.addr;
    let id = ctx.query.id;
    let {
      status,
      data: { course,areaid }
    } = await ctx.$axios.get("http://localhost:3000/course/addr", {
      params: {
        addr,
        id
      }
    });

    if (status === 200) {
      return {
        course,
        areaid
      }
    }
  }
};
</script>

<style>
#product {
  width: 80%;
  height: 1500px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
}
.pro_title {
  flex: 0.055;
  overflow: hidden;
}
.pro_title span:nth-child(1) {
  font-size: 25px;
  font-weight: 300;
  color: rgb(182, 182, 182);
}
.pro_title span:nth-child(2) {
  font-size: 14px;
  font-weight: 400;
  color: rgb(172, 135, 172);
}
.pro_title ul {
  margin-top: 4px;
}
.pro_title ul li {
  list-style-type: none;
  float: left;
  height: 18px;
  border-radius: 5px;
  border: 0.5px solid #bbbbbb;
  color: #b6b1b1;
  font-size: 12px;
  margin-right: 5px;
  padding: 0px 2px;
  border-left: 2.5px solid #d8d8d8;
}
.pro_body1 {
  flex: 0.255;
  display: flex;
  position: relative;
}
.pro_display {
  flex: 0.4;
  height: 60%;
  overflow: hidden;
  padding-bottom: 100px;
}
.pro_display .disbody{
    overflow: hidden;
    height:300px;
    width:1200px;
    opacity: 1;
}
.pro_display .disbody img {
    height: 300px;
    float:left;
}

.pro_last,.pro_next{
  border: 2px dotted rgb(172, 142, 163);
  color: rgb(172, 142, 163);
  height: 30px;
  width: 30px;
  border-radius: 30px;
  text-align: center;
  font-size: 21px;
  position: absolute;
  top: 300px;
}
.pro_next {
  left: 400px;
}
.pro_last {
  left: 360px;
}

.pro_text {
  flex: 0.6;
  background-color: #fff;
}
.pro_text p {
  padding-left: 80px;
  padding-top: 5px;
}
.pro_text p:nth-child(1) {
  font-size: 12px;
  color: rgb(194, 195, 197);
  font-weight: 600;
}
.pro_text p:nth-child(2) {
  background-color: rgba(243, 240, 243, 0.486);
  height: 80px;
  padding-top: 15px;
}
.pro_text p:nth-child(n + 4) {
  padding-top: 20px;
  border-right: 2px solid rgb(182, 145, 168);
}
.pro_text p .sp1 {
  color: rgb(182, 145, 168);
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 40px;
}
.pro_text p .sp2 {
  border-left: 3px solid rgb(138, 138, 138);
  padding-left: 20px;
  color: rgb(139, 139, 139);
  font-weight: 450px;
  font-size: 14px;
}
.pro_text p .sp3 {
  color: rgb(151, 123, 140);
  font-size: 18px;
  font-weight: bolder;
}
.pro_text p .sp4 {
  color: rgb(104, 83, 96);
  font-size: 14px;
  font-weight: 450;
}
.pro_text p .sp5 {
  color: rgb(167, 115, 147);
  border: 1px dashed rgb(167, 115, 147);
  font-size: 13px;
  padding: 4px;
}
.pro_text p .sp6 {
  color: rgb(154, 122, 158);
  font-size: 13px;
  font-weight: 450;
  text-decoration: underline rgb(154, 122, 158);
}
.pro_text p .sp7 {
  color: rgb(76, 61, 78);
  font-size: 14px;
  font-weight: 500;
}
.pro_text p input {
  border: 1px solid #8b8b8b;
  border-radius: 4px;
  height: 28px;
}

.pro_text p .sp8 {
  float: right;
  height: 30px;
  padding-top: 10px;
  text-align: center;
  width: 90px;
  font-weight: 600;
  font-size: 15px;
  border-radius: 20px;
  color: rgb(97, 70, 87);
  border: 1px dashed rgb(167, 115, 147);
}
p .sp8 a {
  color: rgb(97, 70, 87);
}

.pro_body2 {
  flex: 0.69;
  display: flex;
  flex-direction: column;
}
.pro_body2_menu {
  flex: 0.03;
  border-bottom: 2px dotted #fff;
}
.pro_body2_menu .body2 {
  display: flex;
  height: 100%;
}
.pro_body2_menu .body2 a{
  float: left;
  flex: 0.12;
  text-align: center;
  background-color: rgb(172, 142, 163);
  color: #fff;
  padding: 6px 0;
}
.pro_body2_menu .body2 a:hover {
  background-color: #fff;
  color: rgb(167, 109, 109);
}

.pro_body2_detail {
  flex: 1;
  background-color: #d3bcc759;
}
select {
  height:23px;
  border: 1px solid #d3bcc7;
  border-radius: 5px;
}

</style>
