/*
 * @Descripttion: 工具类
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-21 13:58:59
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-21 13:59:10
 */
import moment from 'moment'

export function getLastUpdated(time) {
  return moment(time).fromNow()
}