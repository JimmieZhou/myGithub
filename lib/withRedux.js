/*
 * @Descripttion: 封装一个HOC，next引入redux
 * @version:1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-15 15:24:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-24 16:11:24
 */
import React from "react";
import createSore from "../store/store";
import { isServer } from "../lib/utils";
const __NEXT_REUDX_STORE__ = "__NEXT_REUDX_STORE__";

const getOrCreateStore = initialState => {
  if (isServer) {
    return createSore(initialState);
  }

  if (!window[__NEXT_REUDX_STORE__]) {
    window[__NEXT_REUDX_STORE__] = createSore(initialState);
  }
  return window[__NEXT_REUDX_STORE__];
};

export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      const { Component, pageProps, ...rest } = this.props;
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        />
      );
    }
  }

  WithReduxApp.getInitialProps = async ctx => {
    let reduxStore;
    if (isServer) {
      const { req } = ctx.ctx;
      const session = req.session;

      if (session && session.userInfo) {
        reduxStore = getOrCreateStore({
          user: session.userInfo
        });
      } else {
        reduxStore = getOrCreateStore();
      }
    } else {
      reduxStore = getOrCreateStore();
    }

    ctx.reduxStore = reduxStore;

    let appProps = {};
    if (typeof Comp.getInitialProps === "function") {
      appProps = await Comp.getInitialProps(ctx);
    }

    return {
      ...appProps,
      initialReduxState: reduxStore.getState()
    };
  };

  return WithReduxApp;
};
