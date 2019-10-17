/*
 * @Descripttion: koa服务端
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 09:48:57
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 11:43:48
 */
const Koa = require("koa");
const Router = require("koa-router");
const next = require("next");
const session = require("koa-session");
const Redis = require("ioredis");
const auth = require("./server/auth");
const RedisSessionStore = require("./server/session-store");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// 创建redis client
const redis = new Redis();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.keys = ["Jimmie's develop Github App"];
  const SESSION_CONFIG = {
    key: "jid",
    store: new RedisSessionStore(redis)
  };

  server.use(session(SESSION_CONFIG, server));

  // 配置处理github OAuth的登录
  auth(server);

  router.get("/a/:id", async ctx => {
    const id = ctx.params.id;
    await handle(ctx.req, ctx.res, {
      pathname: "/a",
      query: { id }
    });
    ctx.respond = false;
  });

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
    // 保存session
    ctx.req.session = ctx.session
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
