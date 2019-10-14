<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-25 18:09:52
 * @LastEditTime: 2019-09-27 15:21:27
 * @LastEditors: Please set LastEditors
 -->

## page 目录

> index.js 首页，每一个文件名称会对应一个页面，以路由的形式。除了\_app.js 和\_document.js

## 前端路由跳转

- Link
  > 原理：监听了传入的节点的 onclick 事件，点击事件触发的时候跳转指定的路径

```javascript
  import { Button } from 'antd'
  import Link from 'next/link'
  export default () => (
    <Link href="./test/a">
      <Button>Index</Button>
    </Link>
```

- Router
  > Link 组件的内部也是通过 Router 来实现的，Router 可以实现动态路由

```javascript
import { Button } from "antd";
import Link from "next/link";
import Router from "next/router";
export default () => (
  <>
    <Link href="/test/a" title="page a">
      <Button>Index</Button>
    </Link>
    <Button onClick={() => Router.push("/test/a")}>Index2</Button>
  </>
);
```

## 动态路由与路由映射

- index.js

```javascript
const gotoPage = () => {
  Router.push(
    {
      pathname: "/test/a",
      query: {
        id: 2
      }
    },
    "/test/a/2"
  );
};

export default () => (
  <>
    <Link href="/test/a?id=1" as="/test/a/id" title="page a">
      <Button>Index</Button>
    </Link>
    <Button onClick={gotoPage}>Index2</Button>
  </>
);
```

- a.js

```javascript
import { withRouter } from "next/router";

const A = ({ router }) => <button>page a,route param:{router.query.id}</button>;
// HOC
export default withRouter(A);
```

## 数据获取的方式

- getInitialProps
  - 挂载组件上的一个静态方法，能完成数据获取的工作（作为 props 传递给渲染的页面）
  - 在页面中说去数据
  - 在 App 中获取全局性的数据

```javascript
import { withRouter } from "next/router";

const A = ({ router, name }) => (
  <button>
    page a,route param:{router.query.id} name:{name}
  </button>
);

A.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "zjy"
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
```

## 自定义 APP

- 固定 layout
- 保持一些公用状态
- 给页面传入一些自定义数据
- 自定义错误处理

## 自定义 document

- 只有在服务端渲染的时候才会被调用
- 用来修改服务端渲染的内容
- 一般配合第三方 css-in-js 方案使用
- 根据组件的挂载和卸载来确定样式的展示与否，避免了样式的冲突

## SSR 实现流程

- 页面加载流程
  > 开始 --> 浏览器发起 page 请求 --> koa 接收到请求，并调用 nextjs --> nextjs 开始渲染 --> 调用 app 的 getInitialProps --> 调用页面的 getInitialProps --> 渲染出最终 html --> 结束
- 客户端路由跳转
  > 开始 --> 点击链接按钮 --> 异步加载页面的组件 js --> 调用页面的 getInitialProps --> 数据返回，路由变化 --> 渲染新的页面 --> 结束
