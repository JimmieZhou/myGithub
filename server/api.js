/*
 * @Descripttion: github接口代理
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 16:48:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-23 14:50:04
 */
const { requestGithub } = require("../lib/api");

module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path;
    const method = ctx.method;

    if (path.startsWith("/github/")) {
      console.log(ctx.request.body);
      const session = ctx.session;
      const githubAuth = session && session.githubAuth;
      const headers = {};
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
