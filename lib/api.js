/*
 * @Descripttion: 处理getInitialProps请求接口相关的方法。同时支持客户端和服务端请求
 * 同构的思想，这段代码又要适应服务端的环境还要适应客户端的环境
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-18 09:45:28
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-28 09:26:24
 */

const axios = require("axios");
const { GITHUB_BASE_URL, github } = require("../config");
const { client_id, client_secret, request_token_url } = github;
const { isServer } = require("../lib/utils");

/**
 * 获取github请求接口的token
 * @param {string} code 获取token的code
 */
async function requestToken(code) {
  return await axios({
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
}

/**
 * 请求gihub接口统一方法
 * @param {string} method
 * @param {string} url
 * @param {string} data
 * @param {string} headers
 */
async function requestGithub(method = "GET", url, data = {}, headers) {
  console.log('requestGithub......',Date.now())
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers
  });
}

/**
 * 封装的一个同时支持服务端请求和客户端请求的方法
 * @param {string} param0
 * @param {string} req
 * @param {string} res
 */
async function request({ method = "GET", url, data = {} }, req, res) {
  if (!url) {
    throw Error("url must provide");
  }
  if (isServer) {
    console.log('request:server......',Date.now())
    const session = req.session;
    const githubAuth = session.githubAuth || {};
    const headers = {};
    if (githubAuth.access_token) {
      headers[
        "Authorization"
      ] = `${githubAuth.token_type} ${githubAuth.access_token}`;
    }
    return await requestGithub(method, url, data, headers);
  } else {
    // 只要是路由跳转过来的就走这个流程
    console.log('request:client......',Date.now())
    // /search/respos
    return await axios({
      method,
      url: `/github${url}`,
      data
    });
  }
}

module.exports = {
  requestToken,
  request,
  requestGithub
};
