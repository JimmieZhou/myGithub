/*
 * @Description: server入口文件
 * @Author: jimmie
 * @Date: 2019-09-24 15:49:25
 * @LastEditTime: 2019-09-26 11:03:54
 */
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

const handler = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()

  const router = new Router()
  router.get('/test/a/:id', async (ctx) => {
    const id = ctx.params.id
    await handler(ctx.req, ctx.res, {
      pathname: '/test/a',
      query: {
        id
      }
    })
    ctx.respond = false
  })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    await handler(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.listen(3000, () => {
    console.log('server listen on port 3000')
  })
})

