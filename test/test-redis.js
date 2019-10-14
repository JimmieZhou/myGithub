/*
 * @Descripttion: 
 * @version: 
 * @Author: jimmiezhou
 * @Date: 2019-10-14 10:54:26
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 11:04:14
 */
const Redis = require('ioredis')

const redis = new Redis({
    port: 6379
})

const test = async () => {
    await redis.set('a', '1')
    await redis.set('c', { name: 'jimmie' })
    await redis.setex('b', 60, '2')
    const a = await redis.get('a')
    const b = await redis.get('b')
    const c = await redis.get('c')
    const keys = await redis.keys("*")
    console.log(keys)
    console.log(a, b, c)
}

test()