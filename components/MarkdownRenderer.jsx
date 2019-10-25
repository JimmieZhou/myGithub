import MarkdownIt from "markdown-it";

import { memo, useMemo } from "react";
import "github-markdown-css";

const md = new MarkdownIt({
  html: true,
  linkify: true
});

/**
 * 将base64后的md转为utf8的文件
 * @param {*} str
 */
const b64_to_utf8 = str => {
  return decodeURIComponent(escape(atob(str)));
};

export default memo(function MarkdownRenderer({ content, isBase64 }) {
  const markdown = isBase64 ? b64_to_utf8(content) : content;

  const html = useMemo(() => md.render(markdown), [markdown]);

  return (
    <div className="markdown-body">
      {/* 展示富文本 */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
});
