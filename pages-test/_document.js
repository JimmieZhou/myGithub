/*
 * @Descripttion: 自定义document，用于覆盖内置的document
 * @version:1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 14:57:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-15 16:12:12
 */
import Docuemnt, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

function withLog(Comp) {
  return props => {
    console.log(props);
    return <Comp {...props} />;
  };
}

class MyDocument extends Docuemnt {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const props = await Docuemnt.getInitialProps(ctx);

      return {
        ...props,
        styles: (
          <>
            {props.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
