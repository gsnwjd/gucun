<template lang="html">
   <div class="con-row">
            <div class="row2-hd">
                今日推荐
            </div>
            <div class="row2-bd">
                <ul class="row2-left">
                    <li v-for="(item,idx) in $store.state.course.maplist" :key="idx" @mouseenter="change">
                        {{ item.name }}
                    <i :class="item.addr"/>
                    </li>
                </ul>
                
                <ul class="row2-right" v-if="kind" @mouseenter="sover">
                    <li v-for="(item,idx) in cur_course.course.slice(0,4)">
                        <div class="course">
                            <img :src="item.img_src" class="course_img">
                        </div>
                        <div class="title" :key="idx" >
                          <!--
                            <a :href="'/product?id='+(item.id)"> {{item.title}}</a>
                        -->
                            <a :href="`/product?id=${item.id}&&addr=${cur_course.addr}`"> {{item.title}}</a>
                        </div>
                        <div class="text">
                            <span class="p_people" v-if="(item.p_all_num-item.p_num)">人数未满</span>
                            <span class="p_people_ok" v-else>人数已满</span>
                            <span class="p_num">
                                {{item.p_num}}
                            </span>/
                            <span class="p_all_num">
                                {{item.p_all_num}}
                            </span>&nbsp;&nbsp;&nbsp;
                            <span class="p_pricetitle">价格: </span><span class="p_price">{{item.price}}</span>起
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
        kind:'japan',
        maplist: []
    };
  },
  /*筛选一下*/
  computed:{
        cur_course:function(){
            return this.$store.state.course.maplist.filter((item) => item.addr===this.kind)[0]
        },
        /*not_enough:function(){
            let num=(this.p_num-this.p_all_num)
            if(num<0)
            return true
            else
            return false
        }*/
    },
  methods:{
        mouseleave:function(){
            let self=this;
            self._timer=setTimeout(function(){
                self.kind=''
            },150)
        },
        /*设置一个定时器*/

        change:function(e){
            this.kind=e.target.querySelector('i').className
        },
        sover:function(){
            clearTimeout(this._timer)
        },
  }
};
</script>

<style>
/*第二屏*/
.con-row:nth-child(2) {
  flex-direction: column;
}

.row2-hd {
  flex: 0.1;
  padding-left: 50px;
  padding-top: 25px;
  font-family: 新蒂下午茶基本版;
  font-weight: 400;
  font-size: 23px;
}
.row2-bd {
  flex: 0.9;
  display: flex;
}
.row2-left {
  flex: 0.16;
  list-style: none;
}
.row2-left li {
  height: 35px;
  width: 80px;
  margin: 10px auto;
  line-height: 35px;
  border-radius: 16px;
  border: 1px dotted rgb(240, 231, 113);
  text-align: center;
}

.row2-left li:hover {
  background-color: rgb(133, 170, 72);
  color: #fff;
}

.row2-right {
  flex: 0.84;
  border-left: 1px solid rgb(206, 206, 206);
  list-style: none;
  display: flex;
  overflow: hidden;
  padding-right: 35px;
  padding-top: 10px;
}
.row2-right li {
  flex: 0.25;
  overflow: hidden;
  margin: 5px 0px 0px 35px;
}

.row2-right .title {
  width: 100%;
  margin-top: 10px;
  line-height: 20px;
  height:80px;
  overflow: hidden;
}
.title a{
  color: #aaaaaa;

}

.title a:hover {
  color: #333333;
}

.course {
  width: 100%;
  height: 320px;
  overflow: hidden;
}

.course_img {
  position: relative;
  transition: transform 3s;
  height: 100%;
}
.course_img:hover {
  transform: translateX(-20px);
}

.text {
  text-align: center;
  width: 100%;
  margin-top: 25px;
  position: relative;
  border-left: 5px solid rgb(199, 199, 199);
}
.text .p_num {
  color: rgb(66, 143, 85);
}
.text .p_all_num {
  color: rgb(66, 143, 85);
  opacity: 0.7;
}
.text .p_price {
  font-weight: 800;
  font-family: monospace;
  font-size: 25px;
  color: rgb(86, 143, 105);
}
.text .p_people,
.p_people_ok {
  position: absolute;
  font-size: 13px;
  top: -15px;
}
.text .p_people {
  color: gray;
  border: 1px dotted gray;
}
.text .p_people_ok {
  color:rgb(192, 49, 49);
  border: 1px dotted rgb(192, 49, 49);
}

.text .p_pricetitle {
  color: gray;
  font-size: 13px;
}
</style>
