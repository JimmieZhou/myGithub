/*
 * @Descripttion: koa服务端
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 09:48:57
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 15:30:37
 */
const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const Redis = require("ioredis");
const koaBody = require("koa-body");
const atob = require("atob");
const auth = require("./server/auth");
const api = require("./server/api");
const RedisSessionStore = require("./server/session-store");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 创建redis client
const redis = new Redis();

// 设置nodejs全局增加一个atob方法
global.atob = atob;

app.prepare().then(() => {
  console.log('----server into',Date.now())
  const server = new Koa();
  const router = new Router();

  server.keys = ["Jimmie's develop Github App"];

  server.use(koaBody());

  // koa-session搭配ioredis的实现
  const SESSION_CONFIG = {
    key: "jid",
    maxAge: 86400000 * 10, // 默认是86400000
    store: new RedisSessionStore(redis)
  };

  server.use(session(SESSION_CONFIG, server));

  // 配置处理github OAuth的登录
  auth(server);
  api(server);

  router.get("/api/user/info", async ctx => {
    const user = ctx.session.userInfo;
    if (!user) {
      ctx.status = 401;
      ctx.body = "Need Login";
    } else {
      ctx.body = user;
      ctx.set("Content-Type", "application/json");
    }
  });

  server.use(router.routes());

  server.use(async (ctx, next) => {
    // 保存session记录
    ctx.req.session = ctx.session;
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.listen(3000, () => {
    console.log("koa server listening on 3000");
  });
});
