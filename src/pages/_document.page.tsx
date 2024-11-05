import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <div id="drawer-root" />
        <div id="dialog-root" />
        <NextScript />
      </body>
    </Html>
  );
}
