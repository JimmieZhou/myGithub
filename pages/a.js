/*
 * @Descripttion: 页面a
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 11:34:26
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 16:33:26
 */
// import Comp from "../components/Comp";
import { withRouter } from "next/router";
import styled from "styled-components";
import dynamic from "next/dynamic";

// 按需加载组件
const Comp = dynamic(import("../components/Comp"));

const Title = styled.h1`
  color: green;
  font-size: 32px;
`;

const color = "blue";
const A = ({ router, name, time }) => {
  return (
    <>
      <Comp>
        <div>page-A</div>
        <div>param:{router.query.id}</div>
        <div>data:{name}</div>
        {/* 用style-components引入样式 */}
        <Title>this is title,{time}</Title>
      </Comp>
      {/* css-in-js 组件之间的样式是独立的，互不干扰 */}
      <style jsx>
        {`
          div {
            color: ${color};
          }
        `}
      </style>
      <style jsx global>
        {`
          div {
            color: green;
          }
        `}
      </style>
    </>
  );
};

// 获取数据的方法
A.getInitialProps = async () => {
  // 按需异步加载模块
  const moment = await import("moment");
  // 异步获取数据，再渲染页面
  const promise = new Promise(resole => {
    setTimeout(() => {
      resole({
        name: "jimmie",
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      });
    }, 1000);
  });
  return await promise;
};

export default withRouter(A);
