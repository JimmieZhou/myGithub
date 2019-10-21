/*
 * @Descripttion: 利用LRU缓存策略
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-21 14:34:49
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-21 15:02:09
 */
import LRU from "lru-cache";

const REPO_CACHE = new LRU({
  maxAge: 1000 * 60 * 60
});

export function cache(repo) {
  const full_name = repo.full_name;
  REPO_CACHE.set(full_name, repo);
}

export function get(full_name) {
  return REPO_CACHE.get(full_name);
}

export function cacheArray(repos) {
  if (repos && Array.isArray(repos)) {
    repos.forEach(repo => cache(repo));
  }
}
