<template lang="html">

<div id="p_index" v-if="user">
        <a href="/groupadmin" v-if="user === 'gcadmin'">进入管理页面</a>
        <div class="p_cube">
            <div class="p_cube_hd">
                <span class="p_name">
                    {{user}}
                </span>
                    <nuxt-link to="/exit"class="exit" v-if="isBR">[退出]</nuxt-link>
                <br/>
                <button @click="cube_dis_change(6)" v-if="isBR">
                    <img src="icon/editor2.png" alt="" title="编辑" />
                </button>
                <button @click="cube_dis_change(7)">
                    <img src="icon/news2.png" alt="" title="动态">
                    <span v-if="isBR">1</span>
                </button>                
                <button @click="cube_dis_change(8)" v-if="isBR">
                    <img src="icon/letter.png" alt="" title="消息" >
                    <span></span>
                </button>
            </div>
            <div class="p_cube_bd">
                <div class="cube_dis like" :class="dis[1]">
                    <articollect :user="user"/>
                </div>
                <div class="cube_dis artis" :class="dis[2]">
                    <articube :user="user" />
                </div>
                <div class="cube_dis group" :class="dis[3]">
                    <groups :user="user"></groups>
                </div>
                <div class="cube_dis fans" :class="dis[4]"></div>
                <div class="cube_dis focus" :class="dis[5]">
                    <focuspr :user="user" :isbr="isBR"></focuspr>
                </div>

                <div class="cube_dis editor" :class="dis[6]">
                    <editor :user="user" :auhead="auhead" />
                </div>
                <div class="cube_dis info" :class="dis[7]"></div>
                <div class="cube_dis news" :class="dis[8]">
                    {{fw_user}}{{fw_auhead}}
                </div>
            </div>
        </div>

        <div class="p_item" :style="{backgroundImage: bg}" :class="{NoBr:!isBR}">
            <ul>
                <li @click="cube_dis_change(1)" v-if="isBR">收藏</li>
                <li @click="cube_dis_change(2)">文章</li>
                <li @click="cube_dis_change(3)" v-if="isBR">拼团</li>
                <li @click="cube_dis_change(4)">粉丝</li>
                <li @click="cube_dis_change(5)">关注</li>
            </ul>
        </div>
        
    </div>

    <div id="pno" v-else>
        请先登录
    </div>

</template>

<script>
import Editor from '@/components/pindex/editor.vue'
import Articube from '@/components/pindex/partis.vue'
import Articollect from '@/components/pindex/collartis.vue'
import Groups from '@/components/pindex/group.vue'
import Focuspr from '@/components/pindex/focusperson.vue'


export default {
    components:{
        Editor,
        Articube,
        Articollect,
        Groups,
        Focuspr
    },
  data() {
    return {
      br_user: "",
      br_auhead:"",
      fw_user:"",
      fw_auhead:"",
      dis:[
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: false},
        {visi: true}
      ]
      
    }
  },
    async asyncData(ctx) {
    let id = ctx.query.id;
    let {
      status,
      data: { fw_user,fw_auhead }
    } = await ctx.$axios.get("http://localhost:3000/users/isit", {
      params: {
        id
      }
    });

    if (status === 200) {
      return {
        fw_user,
        fw_auhead
      }
    }
  },
  async mounted() {
    const {
      status,
      data: { user,auhead }
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.br_user = window.decodeURIComponent(user);
      this.br_auhead = auhead
    }
    this.cube_dis_change(2);
  },
  methods:{
      cube_dis_change:function(i){
          for(let i=0;i<this.dis.length;i++){
              this.dis[i].visi = false
          }
          return this.dis[i].visi = true
      }
  },
  computed:{
      bg:function(){
          return `url(${this.auhead})`
        },
      user:function(){
          if(this.fw_user){
              return this.fw_user
          }else{
              return this.br_user
          }
      },
      auhead:function(){
          if(this.fw_auhead){
              return this.fw_auhead
          }else{
              return this.br_auhead
          }
      },
      isBR:function(){
          if(this.fw_user===this.br_user || !this.fw_user){
              return true
          }else{
              return false
          }
      }
  }
}
</script>

<style>

#pno{
    height:600px;
    width:600px;
    margin: 0px auto;
    text-align: center;
    line-height: 500px;
}
#p_index{
    height:1100px;
    width:70%;
    margin: 10px auto;
    /*border:1px solid coral;*/
    position: relative;
    display: flex;
}
#p_index .p_item{
    height:400px;
    flex:0.35;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position-x: 50%;
}
#p_index .p_cube{
    flex:1;
    margin-right: 10px;
}
.p_item ul{
    height:85%;
    width:80%;
    text-align: center;
    margin: 0px auto;
    margin-top: 30px;
    background: rgba(87, 87, 87, 0.459);
    font-family:Fmain;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    color:rgba(255, 255, 255, 0.842);
    border-radius: 10px;
}

.p_item ul li{
    flex:1;
    border-bottom:0.5px dashed #fff;
    padding-top:11%;
    cursor: pointer;
}
.p_item ul li:hover{
    color:cornsilk;
    text-decoration:underline darkgreen;
}
.p_item ul li:last-child{
    border-bottom:0.5px dashed transparent;
}

.p_cube_hd{
    height:100px;
    width:100%;
}

.p_cube_hd .p_name{
    font-family: laihu;
    font-size: 30px;
    font-weight: 300;
    padding-left:10px;
    border-left:4px solid rgb(192, 169, 185);
    display: inline-block;
    height:40px;
    line-height: 40px;
}
.NoBr{
    line-height: 70px;
}
.p_cube_hd .exit{
    font-size: 12px;
    color:rgb(200, 218, 218);
    margin-left: 20px;
    font-weight: 550;
}
.p_cube_hd button{
    background-color: transparent;
    height:25px;
    margin: 10px 10px 0px 5px;
}
.p_cube_hd button img{
    height:25px;
}

.p_cube_hd button span{
    display: inline-block;
    background-color: rgb(255, 81, 125);
    height:15px;
    width:15px;
    border-radius: 50%;
    color:#fff;
}
.p_cube .p_cube_bd{
    width: 100%;
    height:900px;
    padding-top:10px;
    position: relative;
}
.cube_dis{
    width: 100%;
    height:90%;
    position: absolute;
    left:0px;
    top:0px;
    visibility: hidden;
}
.visi{
     visibility: visible;
}
/*
.like{
    background-color: rgb(216, 127, 127);
}
.artis{
    background-color: rgb(175, 180, 106);
}
.group{
    background-color: rgb(192, 145, 186);
}
.fans{
    background-color: rgb(173, 173, 173);
}
.focus{
    background-color: rgb(137, 209, 221);
}
.editor{
    background-color: rgb(255, 208, 107);
}
.info{
    background-color: rgb(74, 204, 139);
}
.news{
    background-color: rgb(148, 145, 177);
    visibility: visible;
}
*/
</style>
