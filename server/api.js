/*
 * @Descripttion: github接口代理，所有客户端的请求都做代理
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 16:48:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 15:29:45
 */

const { requestGithub } = require("../lib/api");

module.exports = server => {
  server.use(async (ctx, next) => {
    const { path, method } = ctx;
    // 所有客户端的请求都做接口代理
    if (path.startsWith("/github/")) {
      console.log('----api代理',Date.now())
      const session = ctx.session;
      const githubAuth = session && session.githubAuth;
      const headers = {};
      // github接口需要带上token
      if (githubAuth && githubAuth.access_token) {
        headers[
          "Authorization"
        ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
      }
      const result = await requestGithub(
        method,
        ctx.url.replace("/github/", "/"),
        ctx.request.body || {},
        headers
      );

      ctx.status = result.status;
      ctx.body = result.data;
    } else {
      await next();
    }
  });
};
