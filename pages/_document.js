/*
 * @Descripttion: 自定义document，用于覆盖内置的document
 * @version:1.0.0
 * @Author: jimmiezhou
 * @Date: 2019-10-14 14:57:38
 * @LastEditors: jimmiezhou
 * @LastEditTime: 2019-10-14 16:09:57
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(<App {...props}></App>)
        });
      const props = await Document.getInitialProps(ctx);
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
        <Head></Head>
        <body>
          <Main></Main>
          <NextScript></NextScript>
        </body>
      </Html>
    );
  }
}
export default MyDocument;
