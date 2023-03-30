import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Shrikhand, Open_Sans } from "next/font/google";

const shrikhand = Shrikhand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-shrikhand",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${openSans.variable} ${shrikhand.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
