/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-26 10:02:11
 * @LastEditTime: 2019-09-26 17:03:21
 * @LastEditors: Please set LastEditors
 */
import { withRouter } from "next/router";
import dynamic from 'next/dynamic'
import Link from "next/link";
import styled from "styled-components";
// import moment from "moment";

const Title = styled.h1`
  color: skyblue;
  font-size: 40px;
`;

// 异步加载组件
const Comp = dynamic(import('../../components/Comp'))

const color = "red";

const A = ({ router, name, time }) => (
  <>
    <Title>this is title {time}</Title>
    <Comp></Comp>
    <Link href="#abc">
      <a className="link">
        page A {router.query.id} {name}
      </a>
    </Link>
    <style jsx>{`
      a {
        color: yellow;
      }
      .link {
        color: ${color};
      }
    `}</style>
    {/* 全局样式 */}
    {/* <style jsx global>{`
      a {
        color: red;
      }
    `}</style> */}
  </>
);

A.getInitialProps = async ctx => {
  const moment = await import('moment')
  const promise = new Promise(resolve => {
    setTimeout(() => {
      resolve({
        name: "zjy",
        time: moment.default(Date.now() - 60 * 1000).fromNow()
      });
    }, 500);
  });
  return await promise;
};

export default withRouter(A);
