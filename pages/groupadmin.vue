<template lang="html">

    <div v-if="admin" class="group">
        <h3>拼团数据生成</h3>
            <table class="group-tb" :model="Form">
                <tr>
                    <td>城市:</td>
                    <td><input type="text" v-model="Form.addr"></td>
                    
                </tr>
                <tr>
                    <td>总标题:</td>
                    <td><input type="text" v-model="Form.title"></td>
                    
                </tr>
                <tr>
                    <td>拼团人数限制:</td>
                    <td><input type="text" v-model.number="Form.p_all_num"></td>
                    
                </tr>
                <tr>
                    <td>评分星级:</td>
                    <td><input type="text" v-model.number="Form.star"/></td>
                </tr>
                <tr>
                    <td>价格:</td>
                    <td><input type="text" v-model.number="Form.price"></td>
                    
                </tr>
                <tr>
                    <td>高清竖图:</td>
                    <td><input type="file" name="au_img" id="au_img" @change="uploadConfig" ref="Img1"></td>
                </tr>
                <tr>
                    <td>高清横图:</td>
                    <td><input type="file" name="au_img" id="au_img" @change="uploadConfig" ref="Img2"></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
    <div class="notin" v-else>
        您无权访问该页面！！！！！
    </div>

</template>

<script>

export default {
    layout:'usual',
    data(){
        return{
            user:'',
            auhead:'',
            Form:{
                addr:'',
                title:'',
                p_all_num:1,
                star:1,
                price:1,
            }
        }
    },
    async mounted() {
    const {
      status,
      data: { user,auhead }
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.user = window.decodeURIComponent(user);
      this.auhead = auhead
    }
  },
  computed:{
      admin:function(){
          if(this.user === 'gcadmin'){
              return true
          }else{
              return false
          }
      }
  }
}
</script>

<style>
.notin{
    height:500px;
    width:800px;
    line-height: 490px;
    border:1px solid rgb(223, 223, 223);
    border-radius: 10px;
    margin:100px auto; 
    text-align: center;
    color:#fff;
    background-color: rgb(100, 100, 100);
}
h1{
    color:rgb(138, 118, 156);
}
.group{
    height:800px;
    width:1000px;
    padding-top:10px;
    background-color: rgba(212, 192, 211, 0.425);
    margin: 0px auto;
}
.group-tb{
    margin:40px auto;
    border:1px solid rgb(156, 156, 156);
}
.group-tb tr {
  height:50px;
  width:800px;
}
tr td:nth-child(1) {
  width:200px;
  text-align: right;
  padding-right: 10px;
}

tr td:nth-child(2) {
  width:550px;
}
tr input {
  border-radius: 10px;
  height: 26px;

  padding:2px 8px;
  border:1px solid rgb(192, 192, 192);
}


</style>
