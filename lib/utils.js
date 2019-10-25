/*
 * @Descripttion: 工具类
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-21 13:58:59
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 16:11:50
 */
const moment = require("moment");

function getLastUpdated(time) {
  return moment(time).fromNow();
}

const isServer = typeof window === "undefined";

module.exports = {
  getLastUpdated,
  isServer
};
