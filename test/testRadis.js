/*
 * @Description: 测试node连接redis数据库
 * @Author: jyzhou
 * @Date: 2019-09-25 16:59:39
 * @LastEditTime: 2019-09-25 17:13:56
 * @LastEditors: Please set LastEditors
 */

const test = async () => {
  const Ioredis = require('ioredis')
  const redis = new Ioredis({
    port: 6379
  })
  // 里面的方法和命令是对应的
  await redis.set('b', 123)
  await redis.setex('a', 10, 'hello')
  const keys = await redis.keys('*')
  console.log(keys)

  const v = await redis.get('a')
  const v1 = await redis.get('b')
  console.log(v,v1)
}
test()
