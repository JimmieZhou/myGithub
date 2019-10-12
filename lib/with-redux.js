/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-29 16:23:17
 * @LastEditTime: 2019-09-29 17:25:37
 * @LastEditors: Please set LastEditors
 */
import React from "react";
import createStore from "../store/store";
const isServer = typeof window === "undefined";
const _NEXT_REDUX_STORE_ = "_NEXT_REDUX_STORE_";

// 问题：如何同步服务端和客户端的store

function getOrCreateStore(initialState) {
  if (isServer) {
    return createStore(initialState);
  }
  if (!window[_NEXT_REDUX_STORE_]) {
    window[_NEXT_REDUX_STORE_] = createStore(initialState);
  }
  return window[_NEXT_REDUX_STORE_];
}

// HOC：接收组件作为参数，返回新的组件
export default Comp => {
  class WithReduxApp extends React.Component {
    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }
    render() {
      const { Component, pageProps, ...rest } = this.props;
      console.log(Component, pageProps);
      if (pageProps) {
        pageProps.test = 123;
      }
      return (
        <Comp
          Component={Component}
          pageProps={pageProps}
          {...rest}
          reduxStore={this.reduxStore}
        ></Comp>
      );
    }
  }
  WithReduxApp.getInitialProps = async ctx => {
    const reduxStore = getOrCreateStore();
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
