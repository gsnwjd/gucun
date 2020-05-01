<template lang="html">
<div>
  <Vueditor class="editor" ref="userinfo"></Vueditor>
  <div class="editor">
    <button @click="get_val">获取</button>
    <br/>
    <br/>
    <br/>
    <form action="upload/img" method="POST">
    <input type="file" name="imagetest">
    <button type="submit">提交</button>
    </form>
    <div v-html="textnode"></div>
  </div>
</div>  
</template>

<script>

export default {
  data(){
    return{
      textnode:'???????'
    }
  },
  mounted () {
  
},
  methods:{
    get_val:function(){
      let textnode = this.$refs.userinfo.getContent();
      console.log( this.$refs.userinfo )
      //this.$refs.userinfo.$upload();
      return this.textnode = textnode
    },
  }
}
</script>

<style>
.editor{
  height:900px;
}
</style>
