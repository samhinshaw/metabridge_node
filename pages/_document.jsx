import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { renderStaticOptimized, rehydrate } from 'glamor/server';

class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStaticOptimized(() => page.html);
    return { ...page, ...styles };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = this.props;
    if (typeof window !== 'undefined') {
      rehydrate(ids);
    } else {
      __NEXT_DATA__.ids = ids;
    }
  }
  render() {
    return (
      <html lang="en-US">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <title>MetaBridge</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#303e4e" />
          <link name="theme-color" content="#303e4e" />
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" />
        </body>
      </html>
    );
  }
}

export default MyDocument;
