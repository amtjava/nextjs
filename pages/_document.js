import Document from "next/document";
import uaParser from "ua-parser-js";
import { Context as ResponsiveContext } from "react-responsive";

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
}

export default MyDocument;
