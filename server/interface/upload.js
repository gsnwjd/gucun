import Router from 'koa-router'
import fs from 'fs'
import Redis from 'koa-redis'
import Passport from './utils/passport'

import num from './utils/numid'
import Arti from '../dbs/models/arti'

const router = new Router({
  prefix: '/upload'
})
let Image = new Redis().client
//let Coll = new Redis().client


/*富文本上传图片*/
router.post('/img', async(ctx) => {

  try{

    const username = decodeURIComponent(ctx.session.passport.user.username)
    let one = await Image.get(`${username}temp`)
    if(!one){
      Image.set(`${username}temp`,'#')
    }
    else{}
    

    let dir_img=Math.random().toString().slice(3,8);

    const file = ctx.request.files.image;
    const reader = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();     // 获取上传文件扩展名

    
      const upStream = fs.createWriteStream(`static/upload/temp/${dir_img}.${ext}`);  // 创建可写流
      reader.pipe(upStream);// 可读流通过管道写入可写流
    

    const img_val = '#'+`/upload/temp/${dir_img}.${ext}`
    Image.append(`${username}temp`,img_val)
    
    
    ctx.body=`/upload/temp/${dir_img}.${ext}" style="width:300px;`
  }catch(e){
    ctx.body='error'
  }
  
})


/*头像上传图片时，删除原来图片*/
router.post('/del',async(ctx)=>{
  let imgurl = ctx.request.body.imgsrc
  imgurl = 'static'+imgurl
  
  fs.unlink(imgurl,(err)=>{
    console.log(err);
  });

  ctx.body=`已删除`
})

/*上传头像图片*/
router.post('/au_img', async(ctx) => {

  try{
    const dir_img=Math.random().toString().slice(3,8);
    const file = ctx.request.files.au_img
    const reader = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();     // 获取上传文件扩展名

    const upStream = fs.createWriteStream(`static/upload/auhead/${dir_img}.${ext}`);  // 创建可写流
    reader.pipe(upStream);// 可读流通过管道写入可写流



    ctx.body={
      imgsrc:`/upload/auhead/${dir_img}.${ext}`
    }
  }catch(e){
    ctx.body='error'
  }
  
})

/*收藏文章*/
router.post('/pusharti',async(ctx)=>{
  const id = ctx.request.body.id
  let username = decodeURIComponent(ctx.session.passport.user.username)
  if(!username){
    username='游客'
  }
  try{
    let one = await Coll.get(`${username}coll`)
    if(!one){
      Coll.set(`${username}coll`,'~')
    }
    else{}

    const id_val = `~${id}`
    Coll.append(`${username}coll`,id_val)

    ctx.body={
      code:0,
      msg:'已收藏'
    }

  }catch(e){
    ctx.body={
      code:-1,
      msg:e
    }
  }
})


/*查看文章是否已经收藏*/
router.get('/had',async(ctx)=>{

  if(ctx.isAuthenticated()){
    let username = decodeURIComponent(ctx.session.passport.user.username)
    let colls = await Coll.get(`${username}coll`)
    const id = ctx.query.id
    if(!colls){
      Coll.set(`${username}coll`,`~`)
      colls = '~~~~'
    }
    try{
      let coll = colls.indexOf(id)
      if(coll>0){
        ctx.body={
          code:0,
          had:'已收藏'
        }
      }else{
        ctx.body={
          code:1,
          had:'收藏'
        }
      }
      
  
    }catch(e){
      ctx.body={
        code:-1,
        had:e
      }
    }
  }
  else{
    ctx.body={
      code:-1,
      had:4
    }
  }
})
/*
router.get('/test',async(ctx)=>{
  try{
    let username = decodeURIComponent(ctx.session.passport.user.username)
    await Coll.del(`${username}coll`)

    ctx.body=`删除成功！`
  }catch(e){
    ctx.body=e
  }
  
})
*/
/*收藏的文章*/
router.get('/getarti',async(ctx)=>{
  let username = decodeURIComponent(ctx.session.passport.user.username)

  try{
    const test = await Coll.get(`${username}coll`)

    if(test.length>3){
      const ids = test.slice(2).split("~")
      let artis = []

      for(let i=0;i<ids.length;i++){
      let arti_val = await Arti.findOne({
        arti_id: ids[i],
      })
      artis.push(arti_val)
    }
    ctx.body={
      code:0,
      artis
    }
    }
    else{
      ctx.body={
        code:0,
        artis:[]
      }
    }
    

  }catch(e){
    ctx.body={
      code:-1,
      msg:e
    }
  }
})

/*删除收藏的文章*/
router.post('/delarti',async(ctx)=>{
  let username = decodeURIComponent(ctx.session.passport.user.username)
  if(!username){
    ctx.body={
      code:2,
      msg:'请先登录'
    }
  }
  else{
    const id = ctx.request.body.id
    try{
      const colls = await Coll.get(`${username}coll`)
      let coll = colls.replace(`~${id}`,'')
      Coll.set(`${username}coll`,coll)
  
      ctx.body={
          code:1,
          msg:'收藏'
        }
  
      }catch(e){
  
      ctx.body={
        code:-1,
        msg:e
      }
    }
  }
  
})


/*发布文章*/
router.post('/artipub', async(ctx)=>{

const username = decodeURIComponent(ctx.session.passport.user.username)
try{
    let {
      user,
      aword,
      allword,
      time,
      time_val,
      auhead,
} = ctx.request.body

let id = num.id(8)

const test = await Image.get(`${username}temp`)
const val = test.slice(2).split("#")
await Image.del(`${username}temp`)

let artival=new Arti({
  author:user,
  arti_id:id,
  time,
  time_val,
  au_head:auhead,
  a_word:aword,
  all_word:allword,
  dis_img:val
})

    artival.save(function (err) {
    if (err) return handleError(err);
    // saved!
    })


ctx.body={
  msg:'发布成功',
  code:0
}
  }
  catch(e){
    ctx.body={
      error:e,
      code:-1
    }
  }
})


export default router
