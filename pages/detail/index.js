/*
 * @Descripttion: 详情页
 * @version: 1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-17 14:43:27
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-22 14:18:24
 */

import dynamic from "next/dynamic";
import withRepoBasic from "../../components/with-repo-basic";
import api from "../../lib/api";

const MDRenderer = dynamic(() => import("../../components/MarkdownRenderer"));

const Detail = ({ readme }) => {
  return <MDRenderer content={readme.content} isBase64={true} />;
};

Detail.getInitialProps = async ({
  ctx: {
    query: { owner, name },
    req,
    res
  }
}) => {
  const readmeResp = await api.request(
    {
      url: `/repos/${owner}/${name}/readme`
    },
    req,
    res
  );

  return {
    readme: readmeResp.data
  };
};

export default withRepoBasic(Detail, "index");
