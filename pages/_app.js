/*
 * @Descripttion: 自定义nextjs的_app文件，用于覆盖默认的一些app实现
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:19:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 11:24:23
 */
import App from 'next/app'
// 这里暂时整体引入antd的样式 mini-css-plugin中的bug
import 'antd/dist/antd.css'

export default App