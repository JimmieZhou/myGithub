/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-26 14:57:39
 * @LastEditTime: 2019-09-26 16:44:22
 * @LastEditors: Please set LastEditors
 */
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

// HOC
const withLog = Comp => {
  return props => {
    return <Comp {...props}></Comp>;
  };
};

class Mydocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;
    const sheet = new ServerStyleSheet();

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
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
export default Mydocument;
