/*
 * @Descripttion: redis数据库相关数据操作
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 15:09:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-22 14:20:09
 */
const getRedisSessionId = sid => {
  return `ssid:${sid}`;
};

class RedisSessionStore {
  constructor(redis) {
    this.redis = redis;
  }

  //获取Redis中存储的session数据
  async get(sid) {
    console.log("get session", sid);
    const id = getRedisSessionId(sid);
    const data = await this.redis.get(id);
    if (!data) {
      return null;
    }
    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    console.log("set session", sid);
    const id = getRedisSessionId(sid);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.redis.setex(id, ttl, sessStr);
      } else {
        await this.redis.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 从reids当中删除某个session
  async destroy(sid) {
    console.log("destroy session", sid);
    const id = getRedisSessionId(sid);
    await this.redis.del(id);
  }
}

module.exports = RedisSessionStore;
