<template lang="html">
  <div id="load">
        <div class="load-con">
            <div class="logo">
                <img src="img/logo-gucun.svg" alt="" @click="location.href='/'">
                <button @click="tab_change(1)">登录</button>/
                <button @click="tab_change(0)">注册</button>
            </div>
            <div class="load">

            <table class="load-tb" :class="show_login" :model="Form2">
                    <tr>
                        <td>登录名称:</td>
                        <td><input type="text" v-model="Form2.username"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>登录密码:</td>
                        <td><input type="password" v-model="Form2.password"></td>
                        <td></td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><button class="login" @click="login">立即登录</button></td>
                    </tr>
                </table>
            <table class="load-tb" :class="show_reg" :model="Form1" ref="Form1">
                <tr>
                    <td>登录名称:</td>
                    <td><input type="text" v-model="Form1.name" @change="valid('name')"></td>
                    <td><span v-if="Pass.name.val">{{Pass.name.msg}}</span></td>
                </tr>
                <tr>
                    <td>登录密码:</td>
                    <td><input type="password" v-model="Form1.pwd"></td>
                    <td></td>
                </tr>
                <tr>
                    <td>重复一遍密码:</td>
                    <td><input type="password" v-model="Form1.cpwd"  @change="valid('pwd')"></td>
                    <td><span v-if="Pass.pwd.val">{{Pass.pwd.msg}}</span></td>
                </tr>
                <tr>
                    <td>注册邮箱:</td>
                    <td><input type="text" v-model="Form1.email" @change="valid('email')"></td>
                    <td>
                      <span v-if="Pass.email.val">{{Pass.email.msg}}</span>
                      <button v-else class="ok" @click="sendMsg">确认</button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="2">{{statusMsg}}</td>
                </tr>
                <tr>
                    <td>验证码:</td>
                    <td><input type="text" v-model="Form1.code"></td>
                    <td>{{error}}</td>
                </tr>
                <tr>
                    <td>头像:</td>
                    <td><input type="file" name="au_img" id="au_img" @change="uploadConfig" ref="file"></td>
                    <td>
                      <img :src="imgsrc" alt="" class="auhead" ref="imgsrc" />
                    </td>
                </tr>
                <tr></tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><button class="register" @click="register">立即注册</button></td>
                </tr>
            </table>

            </div>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout:'usual',
  data() {
    return {
      statusMsg: '',
      show_login:{
          visi:false
      },
      show_reg:{
          visi:true
      },
      imgsrc:'',
      error:'',
      Form1:{
          name:'',
          code:'',
          pwd:'',
          cpwd:'',
          email:'',
      },
      Pass:{
          name:{
            msg:'应该在1~8个字符之间',
            val:false
            },
          pwd:{
            msg:'密码两次输入不一致，请重新输入',
            val:false
            },
          email:{
            msg:'不是正确的邮箱格式',
            val:false
            },

      },
      Form2:{
        username:'',
        password:''
      },
      rules:{
          msg:''
      }
    };
  },
  computed:{
    Allpass:function(){
      if(!this.Pass.name.val && !this.Pass.pwd.val && !this.Pass.email.val){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    sendMsg: function() {
              const self = this

              if(self.Allpass){
                self.$axios.post('/users/verify', {
                  username: encodeURIComponent(self.Form1.name),
                  email: self.Form1.email
                }).then(({
                  status,
                  data
                }) => {
                  if (status === 200 && data && data.code === 0) {
                    
                    let count = 60;
                    self.statusMsg = `验证码已发送,剩余${count--}秒`
                    self.timerid = setInterval(function () {
                      self.statusMsg = `验证码已发送,剩余${count--}秒`
                      if (count === 0) {
                        clearInterval(self.timerid)
                      }
                    }, 1000)
                    
                  } else {
                    self.statusMsg = data.msg
                  }
                })
              }else{
                self.error = '请按照提示输入名称/密码/邮箱'
              }

    },
    register:function() {
              let self = this
              if(this.Allpass){

              self.$axios.post('/users/signup', {
                    username: window.encodeURIComponent(self.Form1.name),
                    password: CryptoJS.MD5(self.Form1.pwd).toString(),                    
                    email: self.Form1.email,
                    code: self.Form1.code,
                    auhead: self.imgsrc
                  }).then(({
                    status,
                    data
                  }) => {
                    if (status === 200) {
                      if (data && data.code === 0) {
                        location.href = '/reg'
                      } else {
                        self.error = data.msg
                      }
                    } else {
                      self.error = `服务器出错，错误码:${status}`
                    }
                    setTimeout(function () {
                      self.error = ''
                    }, 1500)
                  })
              }else{
                self.error = '请按照提示输入名称/密码/邮箱'
              }    
    },
    tab_change:function(a){
        if(a){
        //登录
        return this.show_reg.visi = true,this.show_login.visi = false
        }
        else{
        return this.show_login.visi = true,this.show_reg.visi = false
        }
    },
    login: function () {
      let self=this;
      self.$axios.post('/users/signin',{
        username:window.encodeURIComponent(self.Form2.username),
        password:CryptoJS.MD5(self.Form2.password).toString()
      }).then(({status,data})=>{
        if(status===200){
          if(data&&data.code===0){
            location.href='/'
          }else{
            self.error=data.msg
          }
        }else{
          self.error=`服务器出错`
        }
      })
    },
    uploadConfig:function(e){
        let self = this      
        let imgsrc = this.imgsrc

        if(imgsrc){
          //文件已存在，先删除
          self.$axios.post('http://localhost:3000/upload/del',{imgsrc}).then(({status,data}) => {
            if (status === 200){
                console.log(data)
            } 
        })   
      }
        
        let formData = new FormData();
        formData.append('au_img', e.target.files[0])
        self.$axios.post('http://localhost:3000/upload/au_img',formData).then(({status,data}) => {
            if (status === 200){
                self.imgsrc = data.imgsrc
            } 
        })
    },
    valid:function(i){
      switch(i){
        case 'name':{
          if(this.Form1.name.length>8 || this.Form1.name.length<0){
            return this.Pass.name.val = true
          }else{
            return this.Pass.name.val = false
          }
        }
        break;

        case 'pwd':{
          if(this.Form1.pwd != this.Form1.cpwd){
            return this.Pass.pwd.val = true
          }else{
            return this.Pass.pwd.val = false
          }
        }
        break;

        case 'email':{
          let email = this.Form1.email
          let res = email.indexOf("@")

          if(res === 0 || res===-1){
            return this.Pass.email.val = true
          }else{
            return this.Pass.email.val = false
          }
        }
        break;

      }
    }
  }
};
</script>       

<style>
#load {
  width: 100%;
  height: 850px;
  background: url("/img/txt4.jpeg") no-repeat;
  background-attachment: fixed;
  background-size: 100% auto;
  background-position: 0% 60%;
  font-family: 华文宋体;
  padding-top: 80px;
}
.load-con {
  margin: 0px auto;
  height: 700px;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.65);
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}
.logo {
  flex: 0.1;
  padding-left: 20px;
}
.logo img {
  height: 80px;
}
.logo button{
  background-color: transparent;
  color:rgb(130, 102, 156);
}
.logo button:hover{
  border:1px solid rgb(130, 102, 156);
}
.load {
  flex: 0.5;
  width: 600px;
  position: relative;
  margin: 0px auto;
  margin-top: 40px;
}
.load-tb {
  position: absolute;
}
.load-tb tr {
  height: 50px;
}
tr td:nth-child(1) {
  width: 30%;
  text-align: right;
  padding-right: 10px;
}

tr td:nth-child(2) {
  width: 30%;
}
tr td:nth-child(3) {
  text-align: left;
  padding-left: 15px;
  color: rgb(245, 49, 170);
  font-size: 14px;
  font-family: 微软雅黑;
}
tr td .login {
  font-size: 17px;
  color: rgb(207, 143, 204);
  height: 30px;
  width: 90px;
  background-color: rgb(255, 227, 254);
  text-align: center;
  border-radius: 10px;
}
tr td .register {
  font-size: 17px;
  color: rgb(143, 205, 207);
  height: 30px;
  width: 90px;
  background-color: rgb(227, 248, 255);
  text-align: center;
  border-radius: 10px;
}
tr td .ok {
  font-size: 15px;
  border: 1px dashed rgb(230, 207, 231);
  background-color: #fff;
  width: 50px;
  border-radius: 6px;
  text-align: center;
}
.auhead{
    height:60px;
}
tr input {
  border-radius: 10px;
  height: 26px;
  padding:2px 8px;
}
.visi {
  visibility: hidden;
}
</style>
