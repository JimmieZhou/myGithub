/*
 * @Descripttion: 自定义nextjs的_app文件，用于覆盖默认的一些app实现
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:19:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 11:52:37
 */
import App, { Container } from "next/app";
import { Provider } from "react-redux";

import "antd/dist/antd.css";

import Layout from "../components/Layout";

import withRedux from "../lib/withRedux";

class MyApp extends App {
  state = {
    context: "value"
  };

  static async getInitialProps(ctx) {
    const { Component } = ctx;
    console.log("app init");
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;

    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(MyApp);
