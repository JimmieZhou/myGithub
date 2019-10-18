/*
 * @Descripttion: App主页面
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-16 17:23:47
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-18 10:37:33
 */
import api from "../lib/api";
const Index = () => <span>Index</span>;

Index.getInitialProps = async ({ ctx }) => {
  const result = await api.request(
    {
      url: "/search/repositories?q=react"
    },
    ctx.req
  );
  return {
    data: result.data
  };
};

export default Index;
