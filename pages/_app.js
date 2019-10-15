/*
 * @Descripttion: 自定义nextjs的_app文件，用于覆盖默认的一些app实现
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:19:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-15 10:45:22
 */
import App, { Container } from "next/app";
// _app自定义layout
import Layout from "../components/Layout";
// 这里暂时整体引入antd的样式 mini-css-plugin中的bug

import MyContext from "../lib/my-context";
import "antd/dist/antd.css";
class MyApp extends App {
  state = {
    value: 100
  };

  // _app 自定义数据
  static async getInitialProps({ Component, ctx }) {
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <MyContext.Provider value={this.state.value}>
            <button
              onClick={() =>
                this.setState(state => {
                  return {
                    ...state,
                    value: state.value + 1
                  };
                })
              }
            >
              +
            </button>
            <Component {...pageProps}></Component>
          </MyContext.Provider>
        </Layout>
      </Container>
    );
  }
}

export default MyApp;
