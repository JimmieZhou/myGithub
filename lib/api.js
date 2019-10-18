/*
 * @Descripttion: 处理getInitialProps请求接口相关的方法。同时支持客户端和服务端请求
 * 同构的思想，这段代码又要适应服务端的环境还要适应客户端的环境
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-18 09:45:28
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-18 17:02:43
 */

const axios = require("axios");
const { GITHUB_BASE_URL } = require("../config");
const isServer = typeof window === "undefined";

/**
 * 服务端请求github数据
 * @param {string} method 
 * @param {string} url 
 * @param {object} data 
 * @param {object} headers 
 */
const requestGithub = async (method, url, data, headers) => {
  return await axios({
    method,
    url: `${GITHUB_BASE_URL}${url}`,
    data,
    headers
  });
};

/**
 * 封装一个请求，同时支持客户端和服务端请求github数据
 * @param {object} axios请求参数
 * @param {object} req node的req
 */
const request = async ({ method = "GET", url, data = {} }, req) => {
  if (!url) {
    throw Error("url must be provided");
  }
  if (isServer) {
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
    //  /search/repo
    return await axios({
      method,
      url: `/github${url}`,
      data
    });
  }
};
module.exports = {
  request,
  requestGithub
};
