import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en-US">
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <title>MetaBridge</title>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#303e4e" />
          <link name="theme-color" content="#303e4e" />
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
