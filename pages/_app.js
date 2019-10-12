/*
 * @Description: 用于覆盖默认的app组件的入口文件
 * @Author: your name
 * @Date: 2019-09-25 17:43:00
 * @LastEditTime: 2019-09-29 17:19:01
 * @LastEditors: Please set LastEditors
 */
import App, { Container } from "next/app";
import "antd/dist/antd.css";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import testHoc from "../lib/with-redux";

class MyApp extends App {
  // Component 实际就是各个页面
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps;
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps
    };
  }

  render() {
    // Component 实际就是各个页面
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Layout>
          <Provider store={reduxStore}>
            <Component {...pageProps}></Component>
          </Provider>
        </Layout>
      </Container>
    );
  }
}
export default testHoc(MyApp);
