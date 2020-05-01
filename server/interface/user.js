import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/user'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'
import num from './utils/numid'

let router = new Router({prefix:'/users'})
let Store = new Redis().client

//注册
router.post('/signup',async(ctx)=>{
    const {
        username,
        password,
        email,
        code,
        auhead
    } = ctx.request.body;

    if(code){
    const saveCode = await Store.hget(`nodemail:${username}`,'code')
    const saveExpire=await Store.hget(`nodemail:${username}`,'expire')
    if(code===saveCode){
        if(new Date().getTime()-saveExpire>0){
            ctx.body={
                code:-1,
                msg:'验证码已过期，请重新尝试'
            }
            return false
        }
    }else{
        ctx.body={
            code:-1,
            msg:'请填写正确的验证码'
        }
    }
   
    }else{
        ctx.body={
            code:-1,
            msg:'请填写验证码'
        }
    }
    
    let user = await User.find({username})
    if(user.length){
        ctx.body = {
            code:-1,
            msg:'已被注册'
        }
        return false
    }
    let userid = num.id(5)
    
    let nuser = await User.create({
        username,
        userid,
        password,
        email,
        auhead
    })
    if(nuser){
        
        let res = await axios.post('/users/signin',{
            username,
            password
        })
        if(res.data && res.data.code === 0){
            ctx.body={
                code:0,
                msg:'注册成功',
                user:res.data.user
            }
        }else{
            ctx.body={
                code:-1,
                msg:'error'
            }
        }

    }else{
        ctx.body={
            code:-1,
            msg:'注册失败'
        }
    }
})

//登录
router.post('/signin',async (ctx,next)=>{
    return Passport.authenticate('local', function(err, user, info, status) {
        if (err) {
          ctx.body = {
            code: -1,
            msg: err
          }
        } else {
          if (user) {
            ctx.body = {
              code: 0,
              msg: '登录成功',
              user
            }
            return ctx.login(user)
          } else {
            ctx.body = {
              code: 1,
              msg: info
            }
          }
        }
      })(ctx, next)
})

//验证码
router.post('/verify', async (ctx, next) => {
    let username = ctx.request.body.username
    
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (saveExpire && new Date().getTime() - saveExpire < 0) {
      ctx.body = {
        code: -1,
        msg: '验证请求过于频繁，1分钟内1次'
      }
      return false
    }
    let transporter = nodeMailer.createTransport({
      service: 'qq',
      auth: {
        user: Email.smtp.user,
        pass: Email.smtp.pass
      }
    })
    let ko = {
      code: Email.smtp.code(),
      expire: Email.smtp.expire(),
      email: ctx.request.body.email,
      user: ctx.request.body.username
    }
    let mailOptions = {
      from: `"沽存旅行社" <${Email.smtp.user}>`,
      to: ko.email,
      subject: '沽存旅行社用户注册验证码',
      html: `您在沽存旅行社中注册，验证码为${ko.code}`
    }
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      } else {
        Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
      }
    })
    ctx.body = {
      code: 0,
      msg: '验证码已发送，可能会有延时，有效期1分钟'
    }
  })
  
//退出
router.get('/exit',async(ctx,next)=>{
    await ctx.logout()
    if(!ctx.isAuthenticated()){
        ctx.body={
            code:0
        }
    }else{
        ctx.body = {
            code:-1
        }
    }
})

//获取用户名
router.get('/getUser',async(ctx)=>{
    if(ctx.isAuthenticated()){
        const {username,auhead, email} = ctx.session.passport.user
        ctx.body={
            user:username,
            email,
            auhead
        }
    }else{
        ctx.body={
            user:'',
            email:''
        }
    }
})

router.get('/isit',async(ctx,next)=>{
    let id = ctx.query.id
    try{
      let person = await User.findOne({
      userid:id
      })
      ctx.body = {
          fw_user:decodeURIComponent(person.username),
          fw_auhead:person.auhead
      }
  }catch(e){
    ctx.body = {
      code:1,
      error:e
    }
  }

})

export default router



