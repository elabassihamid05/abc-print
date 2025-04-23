import Document, { Html, Head, Main, NextScript } from "next/document";
import { createGetInitialProps } from "@mantine/next";
//@ts-ignore
// import * as snippet from "@segment/snippet";

// const {
//   // This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
//   ANALYTICS_WRITE_KEY = "ZiafDupE8ko3bW1BOSfhaI51WG467DBX",
//   NODE_ENV = "development",
// } = process.env;

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  // renderSnippet() {
  //   const opts = {
  //     apiKey: ANALYTICS_WRITE_KEY,
  //     // note: the page option only covers SSR tracking.
  //     // Page.js is used to track other events using `window.analytics.page()`
  //     page: true,
  //   };

  //   if (NODE_ENV === "development") {
  //     return snippet.max(opts);
  //   }

  //   return snippet.min(opts);
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="preload"
            href="/fonts/inter-var-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            rel="preconnect"
            href="https://cdn.usefathom.com"
            crossOrigin=""
          />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            color="#4a9885"
            href="/static/favicons/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <meta content="#ffffff" name="theme-color" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta
            content="/static/favicons/browserconfig.xml"
            name="msapplication-config"
          />
          <meta content="14d2e73487fa6c71" name="yandex-verification" />
          <meta
            content="eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw"
            name="google-site-verification"
          /> */}
          {/* Inject the Segment snippet into the <head> of the document  */}
          {/* <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} /> */}
          <script async src="https://widget.frill.co/v2/widget.js"></script>
        </Head>
        <body className="text-base bg-white text-blue-gray-700">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
