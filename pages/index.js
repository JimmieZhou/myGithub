/*
 * @Descripttion: App主页面
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 17:23:47
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-18 11:34:37
 */
import api from "../lib/api";
import { connect } from "react-redux";
import { Button } from "antd";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const Index = ({ userRepos, userStarredRepos, user }) => {
  if (!user || !user.id) {
    return (
      <div className="root">
        <p>亲，您还没有登录哦~</p>
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
  return <span>Index</span>;
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  const user = reduxStore.getState().user;
  if (!user || !user.id) {
    return {
      isLogin: false
    };
  }
  const userReposResp = await api.request(
    {
      url: "/user/repos"
    },
    ctx.req
  );
  const userStarredReposResp = await api.request(
    {
      url: "/user/starred"
    },
    ctx.req
  );
  return {
    isLogin: true,
    userRepos: userReposResp.data,
    userStarredRepos: userStarredReposResp.data
  };
};

export default connect(function mapStateToProps(state) {
  return {
    user: state.user
  };
})(Index);
