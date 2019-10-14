/*
 * @Descripttion: nextjs框架的配置文件，用于修改其一些默认配置
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:06:20
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 11:12:36
 */

// next支持使用css
const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => { }
}

module.exports = withCss({})