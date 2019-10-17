/*
 * @Descripttion: 接入github OAuth
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 15:10:02
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 14:14:53
 */
const axios = require("axios");

const config = require("../config");

const { client_id, client_secret, request_token_url } = config.github;

module.exports = server => {
  server.use(async (ctx, next) => {
    // doc: https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/
    // 这里https://github.com/login/oauth/authorize？client_id=b50f64b8e843c7f47137,请求后会跳转到
    // http://localhost:3000/auth?code=57f71043c9cc20586f75
    if (ctx.path === "/auth") {
      const code = ctx.query.code;
      if (!code) {
        ctx.body = "code not exist";
        return;
      }
      const result = await axios({
        method: "POST",
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code
        },
        headers: {
          Accept: "application/json"
        }
      });

      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data;

        const { access_token, token_type } = result.data;

        const userInfoResp = await axios({
          method: "GET",
          url: "https://api.github.com/user",
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        });
        ctx.session.userInfo = userInfoResp.data;
        ctx.redirect("/");
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
      ctx.body = "logout success";
    } else {
      await next();
    }
  });
};
