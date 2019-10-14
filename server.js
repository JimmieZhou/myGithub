/*
 * @Descripttion: koa服务端
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 09:48:57
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 10:23:55
 */
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handler = app.getRequestHandler()

// 等待page目录下的页面相应完成之后再使用koa
app.prepare().then(() => {
    const server = new Koa()
    server.use(async (ctx, next) => {
        await handler(ctx.req, ctx.res)
        ctx.respond = false
    })
    server.listen(3000, () => {
        console.log('server listen on 3000')
    })
})