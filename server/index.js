const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import koaBody from 'koa-body'
import mongoose from 'mongoose'
import dbConfig from './dbs/config'

import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'

import passport from './interface/utils/passport'

import course from './interface/course'
import upload from './interface/upload'
import user from './interface/user'
import order from './interface/order'
import arti from './interface/arti'
import foc from './interface/foc'


const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
console.log('未启动')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  mongoose.connect(dbConfig.dbs,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
  })
  
console.log('已经启动')
  
  const {
    host = process.env.HOST || 'localhost',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }


  app.use(json())


  app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 3*1024*1024  // 设置上传文件大小最大限制，默认2M
    }
}))


app.keys=['gucun','keyskeys']
app.proxy=true
app.use(session({
  key:'gucun',
  prefix:'gucun:uid',
  store: new Redis()
}))

app.use(passport.initialize())
app.use(passport.session())

  app.use(course.routes()).use(course.allowedMethods())
  app.use(upload.routes()).use(upload.allowedMethods())
  app.use(user.routes()).use(user.allowedMethods())
  app.use(order.routes()).use(order.allowedMethods())
  app.use(arti.routes()).use(arti.allowedMethods())
  app.use(foc.routes()).use(foc.allowedMethods())

  //配置路由
  

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
