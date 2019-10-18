/*
 * @Descripttion: github接口代理
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 16:48:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-18 10:51:49
 */
const axios = require("axios");
const { requestGithub } = require("../lib/api");
module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path;
    const method = ctx.method;
    if (path.startsWith("/github/")) {
      const session = ctx.session;
      const githubAuth = session && session.githubAuth;
      const headers = {};
      if (githubAuth.access_token) {
        headers[
          "Authorization"
        ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
      }
      const result = await requestGithub(
        method,
        ctx.url.repalce("/github/", "/"),
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
