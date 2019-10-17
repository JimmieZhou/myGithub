/*
 * @Descripttion: github接口代理
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 16:48:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 17:10:13
 */
const axios = require("axios");
const github_base_url = "https://api.github.com";
module.exports = server => {
  server.use(async (ctx, next) => {
    const path = ctx.path;
    if (path.startsWith("/github/")) {
      const githubAuth = ctx.session.githubAuth;
      const githubPath = `${github_base_url}${ctx.url.replace(
        "/github/",
        "/"
      )}`;
      const token = githubAuth && githubAuth.access_token;
      let headers = {};
      if (token) {
        headers["Authorization"] = `${githubAuth.token_type} ${token}`;
      }
      ctx.set("Content-Type", "application/json");
      try {
        const result = await axios({
          method: "GET",
          url: githubPath,
          headers
        }).catch(err => console.error(err));

        if (result.status === 200) {
          ctx.body = result.data;
        } else {
          ctx.status = result.status;
          ctx.body = {
            success: false
          };
        }
      } catch (error) {
        ctx.body = {
          success: false
        };
        console.error(error);
      }
    } else {
      await next();
    }
  });
};
