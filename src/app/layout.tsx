import "../assets/styles/global.css";

import { Golos_Text } from "next/font/google";
import { PropsWithChildren } from "react";

const golos_text = Golos_Text({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default async function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html>
      <head></head>
      <body className={golos_text.className}>{children}</body>
    </html>
  );
}
