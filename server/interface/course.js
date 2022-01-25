
import Router from 'koa-router'
// import Course from '../dbs/models/course'
import Product from '../dbs/models/product'
import Arti from '../dbs/models/arti'
import Redis from 'koa-redis'

let Order = new Redis().client

let router = new Router({
  prefix: '/course'
})

/*所有拼团数据*/
router.get('/group',async(ctx)=>{
  try {
    //let id=ctx.query.id
    let group_vals = await Product.find()
    /*
    let group = []
    for(let i = 0 ; i<group_vals.length ; i++){
      let val = group_vals[i].course
      group = group.concat(val);
    }
    */
   ctx.body = {
     code: 0,
     group:group_vals
   }
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})
/*存储订单数据*/
router.post('/orderin',async(ctx)=>{
  try {
    let username = decodeURIComponent(ctx.session.passport.user.username)
    let orderval=ctx.request.body.orderval
    let id=ctx.request.body.id

    Order.set(`${username}order${id}`,orderval)
    ctx.body = {
     code: 1,
   }
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})



/*拿订单数据*/
router.get('/orderout',async(ctx)=>{
  let username = decodeURIComponent(ctx.session.passport.user.username)
  try {
    let id=ctx.query.id
    let order = await Order.get(`${username}order${id}`)
    if(order){
      ctx.body = {
        code: 0,
        order
      }
    }
   
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})

/*文章*/
router.get('/arti', async(ctx) => {
    
    try {
      let id=ctx.query.id
      let arti_val = await Arti.findOne({
        arti_id:id
     })
     ctx.body = {
       code: 0,
       arti:arti_val
     }
   } 
   catch (e) {
     ctx.body = {
       code: -1
     }
  }
  
})

/*所有文章*/
router.get('/artis', async(ctx) => {
    
  try {
    let arti_val = await Arti.find()
    ctx.body = {
      code: 0,
      artis:arti_val
   }
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})

/*关键词文章*/
router.get('/keyarti', async(ctx) => {
    
  try {
    let key = ctx.query.key
    let arti_val = await Arti.find({a_word: new RegExp(key)})
    ctx.body = {
      code: 0,
      keyarti:arti_val,
      key
   }
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})


/*个人文章*/
router.get('/partis', async(ctx) => {
    
  try {
    let user = ctx.query.user
    let arti_val = await Arti.find({author: user})
    ctx.body = {
      code: 0,
      p_artis:arti_val,
   }
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}

})

export default router
/*
module.exports={
  router:router
} 
*/