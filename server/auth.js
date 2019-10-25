/*
 * @Descripttion: 接入github OAuth流程
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 15:10:02
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 15:26:46
 */
const config = require("../config");
const { requestToken, requestGithub } = require("../lib/api");

module.exports = server => {
  server.use(async (ctx, next) => {
    // 1. 通过client_id 获取到code，同时路由跳转为xxx/auth?code=xxx
    if (ctx.path === "/auth") {
      console.log('----auth',Date.now())
      const code = ctx.query.code;
      if (!code) {
        ctx.body = "code not exist";
        return;
      }
      // 2. 获取token
      const result = await requestToken(code);

      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data;
        const { access_token, token_type } = result.data;
        // 3. 请求用户数据
        const userInfoResp = await requestGithub("GET", "/user", undefined, {
          Authorization: `${token_type} ${access_token}`
        });
        ctx.session.userInfo = userInfoResp.data;

        // 保持在任何页面刷新时，都能在当前页面刷新
        ctx.redirect((ctx.session && ctx.session.urlBeforeOAuth) || "/");
        ctx.session.urlBeforeOAuth = "";
      } else {
        const errorMsg = result.data && result.data.error;
        ctx.body = `request token failed ${errorMsg}`;
      }
    } else {
      await next();
    }
  });

  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    if (path === "/logout" && method === "POST") {
      ctx.session = null;
      ctx.body = `logout success`;
    } else {
      await next();
    }
  });

  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    if (path === "/prepare-auth" && method === "GET") {
      console.log('----prepare-auth',Date.now())
      const { url } = ctx.query;
      // 保持在任何页面刷新时，都能在当前页面刷新
      ctx.session.urlBeforeOAuth = url;
      ctx.redirect(config.OAUTH_URL);
    } else {
      await next();
    }
  });
};
