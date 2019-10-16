/*
 * @Descripttion: 接入github OAuth
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 15:10:02
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-16 16:41:50
 */
const axios = require('axios')

const config = require('../config')

const { client_id, client_secret, request_token_url } = config.github

module.exports = server => {
  server.use(async (ctx, next) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      })

      console.log(result.status, result.data)

      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data

        const { access_token, token_type } = result.data

        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        })

        // console.log(userInfoResp.data)
        ctx.session.userInfo = userInfoResp.data

        ctx.redirect('/')
      } else {
        const errorMsg = result.data && result.data.error
        ctx.body = `request token failed ${errorMsg}`
      }
    } else {
      await next()
    }
  })
}