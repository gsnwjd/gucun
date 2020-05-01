<template lang="html">
<div class="ed">
  标题:&nbsp;&nbsp;<input type="text" v-model="aword">
  <Vueditor class="editor" ref="allword"></Vueditor>

  <div class="bottom">
    <button @click="get_val">确认发布</button>
    <div v-html="allword"></div>
  </div>

</div>  
</template>

<script>

export default {
  data(){
    return{
      allword:'',
      aword:'',
      ti:'',
      ti_val:'',
      msg:''
    }
  },
  props:['user','auhead'],
  methods:{
    get_val:function(){
      let allword = this.$refs['allword'].getContent().replace(`style="width:300px;"`,"")
      let aword = this.aword
      
      let user = this.user
      let auhead = this.auhead
      let ti = this.date_val()
      let time = ti[1]
      let time_val = ti[0]
      this.$axios.post('http://localhost:3000/upload/artipub',{
          user,
          aword,
          allword,
          time,
          time_val,
          auhead,
      }).then(({status,data}) => {
                  if (status === 200 && data.code=== 0) {
                    alert(data.msg)
                    location.href = '/pindex'
                  }
      })      

    },
    date_val:function(){
      let time = new Date()
      let year = time.getFullYear()
      let mon = time.getMonth() + 1
      let date = time.getDate()
      let h = time.getHours()
      let m = time.getMinutes()
      let s = time.getSeconds()
      let ti = year+'年'+mon+'月'+date+'日'+h+'时'+m+'分'+s+'秒'
      mon = mon>10?mon:'0'+mon
      let ti_val = year+''+mon+''+date
      return [ti_val,ti]
    }
    }
  }
</script>

<style>
.ed input{
  height:28px;
  padding:1px;
  width:90%;
  border:1px solid rgb(209, 209, 209);
  margin-bottom:5px;
}
.ed button{
  background-color: rgb(212, 192, 211);
  font-size: 15px;
  width:80px;
  line-height: 25px;
}
.editor{
  height:800px;
}
</style>
