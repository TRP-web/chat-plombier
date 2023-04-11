import React from "react"
import Header from "./header"
import Footer from "./footer"
import { Istok_Web } from 'next/font/google'

interface ILayOutProps {
	children: React.ReactNode
}

const istokWeb = Istok_Web({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"]
})

// export const Fonts = localFont({
// 	src: [
// 	  {
// 		 path: "../../fonts/phetsarath-bold.ttf",
// 		 weight: "700",
// 		 style: "normal"
// 	  },
// 	  {
// 		 path: "../../fonts/phetsarath-regular.ttf",
// 		 weight: "400",
// 		 style: "normal"
// 	  }
// 	]
//  })

const LayOut: React.FC<ILayOutProps> = ({ children }) => {

	return (
		<>
			<div className={`flex justify-between min-h-screen dere flex-col relative overflow-hidden ${istokWeb.className}`} >
				<Header />
				{children}
				<Footer />
			</div>
		</>
	)
}
export default LayOut