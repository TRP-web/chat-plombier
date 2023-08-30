import "../globals.css"
import type { AppProps } from "next/app"
import { Istok_Web } from 'next/font/google'

const istokWeb = Istok_Web({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap"
})
// export const Fonts = localFont({
//   src: [
//     {
//       path: "../fonts/Phetsarath-Bold.woff",
//       weight: "700"
//     },
//     {
//       path: "../fonts/Phetsarath-Bold.woff",
//       weight: "400"
//     }
//   ]
// })


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
