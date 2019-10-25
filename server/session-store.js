/*
 * @Descripttion: redis数据库相关数据操作
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 15:09:10
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 15:10:43
 */
const getRedisSessionId = sid => {
  return `ssid:${sid}`;
};

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  //获取Redis中存储的session数据
  async get(sid) {
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error(err);
    }
  }

  // 存储session数据到redis
  async set(sid, sess, ttl) {
    const id = getRedisSessionId(sid);
    if (typeof ttl === "number") {
      ttl = Math.ceil(ttl / 1000);
    }
    try {
      const sessStr = JSON.stringify(sess);
      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // 从reids当中删除某个session
  async destroy(sid) {
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;
