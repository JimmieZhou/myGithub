/*
 * @Descripttion: App主页面
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 17:23:47
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-25 16:04:50
 */
import { useEffect } from "react";
import { Button, Icon, Tabs } from "antd";
import getCofnig from "next/config";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import Repo from "../components/Repo";
import { cacheArray } from "../lib/repo-basic-cache";
import { isServer } from "../lib/utils";

const api = require("../lib/api");

const { publicRuntimeConfig } = getCofnig();

let cachedUserRepos, cachedUserStaredRepos;

const Index = ({ userRepos, userStaredRepos, user, router }) => {
  const tabKey = router.query.key || "1";

  const handleTabChange = activeKey => {
    Router.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      cachedUserRepos = userRepos;
      cachedUserStaredRepos = userStaredRepos;
      // 缓存失效时间设置
      const timeout = setTimeout(() => {
        cachedUserRepos = null;
        cachedUserStaredRepos = null;
      }, 1000 * 60 * 10);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [userRepos, userStaredRepos]);

  useEffect(() => {
    if (!isServer) {
      cacheArray(userRepos);
      cacheArray(userStaredRepos);
    }
  });

  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲，您还没有登录哦~</p>
        {/* 当发送这个请求的时候，会首先去github oath获取code，通过client_id和scope */}
        <Button type="primary" href={publicRuntimeConfig.OAUTH_URL}>
          点击登录
        </Button>
        <style jsx>{`
          .root {
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="root">
      <div className="user-info">
        <img src={user.avatar_url} alt="user avatar" className="avatar" />
        <span className="login">{user.login}</span>
        <span className="name">{user.name}</span>
        <span className="bio">{user.bio}</span>
        <p className="email">
          <Icon type="mail" style={{ marginRight: 10 }} />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className="user-repos">
        <Tabs activeKey={tabKey} onChange={handleTabChange} animated={false}>
          <Tabs.TabPane tab="你的仓库" key="1">
            {userRepos.map(repo => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="你关注的仓库" key="2">
            {userStaredRepos.map(repo => (
              <Repo key={repo.id} repo={repo} />
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
      <style jsx>{`
        .root {
          display: flex;
          align-items: flex-start;
          padding: 20px 0;
        }
        .user-info {
          width: 200px;
          margin-right: 40px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
        }
        .login {
          font-weight: 800;
          font-size: 20px;
          margin-top: 20px;
        }
        .name {
          font-size: 16px;
          color: #777;
        }
        .bio {
          margin-top: 20px;
          color: #333;
        }
        .avatar {
          width: 100%;
          border-radius: 5px;
        }
        .user-repos {
          flex-grow: 1;
        }
      `}</style>
    </div>
  );
};

/**
 * 请求github个人仓库和关注仓库的数据
 */
const fetchIndexDatas = async ctx => {
  const fetchs = await Promise.all([
    await api.request(
      {
        url: "/user/repos"
      },
      ctx.req,
      ctx.res
    ),
    await api.request(
      {
        url: "/user/starred"
      },
      ctx.req,
      ctx.res
    )
  ]);
  const [userRepos, userStaredRepos] = fetchs;
  return {
    userRepos,
    userStaredRepos
  };
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  console.log("----index-getInitialProps", Date.now());
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false
    };
  }

  if (!isServer) {
    if (cachedUserRepos && cachedUserStaredRepos) {
      return {
        userRepos: cachedUserRepos,
        userStaredRepos: cachedUserStaredRepos
      };
    }
  }

  const { userRepos, userStaredRepos } = await fetchIndexDatas(ctx);

  return {
    isLogin: true,
    userRepos: userRepos.data,
    userStaredRepos: userStaredRepos.data
  };
};

export default withRouter(
  connect(function mapState(state) {
    return {
      user: state.user
    };
  })(Index)
);
