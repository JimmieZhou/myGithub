import { resolve } from "_any-promise@1.3.0@any-promise";

/*
 * @Descripttion: 详情页
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 14:43:27
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-17 16:06:33
 */

function Detail() {
  return <span>Detail</span>;
}

Detail.getInitialProps = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, 1000);
  });
};

export default Detail;
