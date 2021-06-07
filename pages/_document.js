import Document from "next/document";
import uaParser from "ua-parser-js";
import { Context as ResponsiveContext } from "react-responsive";
import { Html, Head, Main, NextScript } from 'next/document';
const withResponsiveContext = (App, req) => {
  const contextValue = (() => {
    if (!req) {
      // it's a static render, when no req https://github.com/vercel/next.js/issues/7791
      return;
    }

    const { device } = uaParser(req.headers["user-agent"]);
    const isMobile = device.type === "mobile";
    return { width: isMobile ? 767 : 768 };
  })();

  return (props) => (
    <ResponsiveContext.Provider value={contextValue}>
      <App {...props} />
    </ResponsiveContext.Provider>
  );
};

/**
 * Wraps App with Context only during SSR. We want to do regular device detecting on client.
 * If you need Context to be set both in server and browser, set it up in the _app.js - https://github.com/zeit/next.js#custom-app
 */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => withResponsiveContext(App, ctx.req)
      });

    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="shortcut icon" href={favicon} /> */}
          <link rel="shortcut icon" href="http://americanmuslimtoday.net:3000/images/weblogo.png"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }



}

export default MyDocument;
