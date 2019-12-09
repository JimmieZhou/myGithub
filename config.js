/*
 * @Descripttion: 注册github-oAuth-app相关配置
 * @version:
 * @Author: jimmiezhou
 * @Date: 2019-10-15 17:29:48
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-12-09 15:43:19
 */
const GITHUB_BASE_URL = "https://api.github.com";
const GITHUB_OAUTH_URL = "https://github.com/login/oauth/authorize";
const GITHUB_USER_URL = "https://api.github.com/user";
const SCOPE = "user";
const client_id = "b50f64b8e843c7f47137";

module.exports = {
  github: {
    client_id,
    client_secret: "69c420a13948fd3a4025c639e272a811d4b92f42",
    request_token_url: "https://github.com/login/oauth/access_token"
  },
  GITHUB_BASE_URL,
  GITHUB_OAUTH_URL,
  GITHUB_USER_URL,
  OAUTH_URL: `${GITHUB_OAUTH_URL}?client_id=${client_id}&scope=${SCOPE}`
};
