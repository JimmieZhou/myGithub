/*
 * @Descripttion: 自定义nextjs的_app文件，用于覆盖默认的一些app实现
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:19:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-22 10:19:55
 */
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import Router from "next/router";
import withRedux from "../lib/withRedux";
import Layout from "../components/Layout";
import PageLoading from "../components/PageLoading";

class MyApp extends App {
  state = {
    context: "value",
    loading: false
  };

  startLoading = () => {
    this.setState({
      loading: true
    });
  };

  stopLoading = () => {
    this.setState({
      loading: false
    });
  };

  componentDidMount() {
    Router.events.on("routeChangeStart", this.startLoading);
    Router.events.on("routeChangeComplete", this.stopLoading);
    Router.events.on("routeChangeError", this.stopLoading);
    
  }

  componentWillUnmount() {
    Router.events.off("routeChangeStart", this.startLoading);
    Router.events.off("routeChangeComplete", this.stopLoading);
    Router.events.off("routeChangeError", this.stopLoading);
  }

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
    const { loading } = this.state;
    return (
      <Container>
        <Provider store={reduxStore}>
          {loading ? <PageLoading /> : null}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(MyApp);
