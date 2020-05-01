
import Router from 'koa-router'

import myOrder from '../dbs/models/order'
import Redis from 'koa-redis'

let Order = new Redis().client

let router = new Router({
  prefix: '/order'
})

/*存储订单数据*/
router.post('/in',async(ctx)=>{
  try {
    let username = decodeURIComponent(ctx.session.passport.user.username)
    let orderval=ctx.request.body.orderval
    let id=ctx.request.body.id

    let pindex = await myOrder.findOne({
      name:username
    })
    if(!pindex){
      let testval=new myOrder({
        name:username,
        orderval:[]
      })
      testval.save(function (err) {
        if (err) return handleError(err)
        })
    }else{}

    await Order.set(`${username}order${id}`,orderval)
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


/*完成支付*/
router.post('/hadpay',async(ctx)=>{
  try{
    let username = decodeURIComponent(ctx.session.passport.user.username)
    let id=ctx.request.body.id
    let orderval= await Order.get(`${username}order${id}`)
    await Order.del(`${username}order${id}`)
    if(orderval){
      await myOrder.updateOne({name:username},{$addToSet:{orderval:[{
        id:id,
        val:orderval
      }]}},function(error, res){
        console.log(error)
      })
    }
  
    ctx.body={
      code:0
    }
  }catch(e){
    console.log(e)
  }
})


/*拿订单数据*/
router.get('/out',async(ctx)=>{
  let username = decodeURIComponent(ctx.session.passport.user.username)
  try {
    let id=ctx.query.id
    let order = await Order.get(`${username}order${id}`)
    if(order){
      ctx.body = {
        code: 0,
        order,
        orderid:id
      }
    }
   
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}
})

/*所有订单数据*/
router.get('/all',async(ctx)=>{
  let username = decodeURIComponent(ctx.session.passport.user.username)
  try {
    let orders =  await myOrder.findOne({
      name:username
   })
    let groups = orders.orderval
    ctx.body={
      code:0,
      groups
    }
   
 } 
 catch (e) {
   ctx.body = {
     code: -1
   }
}
})


export default router