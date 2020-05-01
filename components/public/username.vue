<template lang="html">
<div class="name">
        <template v-if="user">
            <a href="/pindex" class="person-index">
                <auhead class="mgt" :auhead="auhead" :suit="suit"/>
                <span>{{user}}</span>
            </a>   
        </template>

        <template v-else>
            <a href="/reg" class="load">登录/注册</a>
        </template>
</div>
</template>

<script>
import Auhead from '@/components/public/userhead.vue'

export default {
  data() {
    return {
      user: "",
      auhead:"",
      suit:true
    };
  },
  components:{
    Auhead
  },
  async mounted() {
    const {
      status,
      data: { user,auhead}
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.user = window.decodeURIComponent(user);
      this.auhead = auhead
    }
  }
};
</script>

<style>
.name{
    flex:0.12;
    height:70px;
}
.name a{
    display: inline-block;
}
.mgt{
      margin-top:16px;
}
.name .load{
    background-color: rgb(180, 149, 194);
    color:#fff;
    width:100%;
    margin-left:40px;
    height:100%;
    line-height: 70px;
    margin: 0px auto;
    border-bottom: 1px dashed rgb(180, 149, 194);
    text-align: center;
}
.name .person-index{
    text-align: left;
    width:100%;
    height:100%;
    line-height: 60px;
    background-color: rgb(245, 245, 245);
    position: relative;
    padding-left:5px;
}
.name .person-index span{
    left:50px;
    top:6px;
    display: inline-block;
    font-family:微软雅黑 ;
    font-weight: 400;
    color:rgb(68, 68, 68);
    position:absolute;
}
</style>
