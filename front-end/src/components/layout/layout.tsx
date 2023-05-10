import React from "react"
import Header from "./header"
import Footer from "./footer"
import { Istok_Web } from 'next/font/google'
import client from "@/contentful"
import { ILogoFields, IPhoneFields } from "@/contentful/contentful"

interface ILayOutProps {
	children: React.ReactNode
}

const istokWeb = Istok_Web({
	weight: ["400", "700"],
	style: ["normal", "italic"],
	subsets: ["latin"],
	display: "swap"
})

const LayOut: React.FC<ILayOutProps> = (props) => {
	const [phone, setPhone] = React.useState<IPhoneFields>()
	const [logo, setLogo] = React.useState<ILogoFields>()

	const getStates = async () => {
		const logo = await client.getEntries<any>({
			content_type: "logo"
		})
		const logoFileds: ILogoFields = logo.items[0].fields
		const phone = await client.getEntries<any>({
			content_type: "phone"
		})

		const phoneFilds: IPhoneFields = phone.items[0].fields

		setPhone(phoneFilds)
		setLogo(logoFileds)
	}

	React.useEffect(() => {
		getStates()
	}, [])

	return (
		<>
			<div className={`relative  max-tablet:overflow-hidden ${istokWeb.className}`} >
				<Header logoFields={logo} phoneFields={phone} />
				{props.children}
				<Footer logoFields={logo} phoneFields={phone} />
			</div>
		</>
	)

}
export default LayOut

// export const getStaticProps: GetStaticProps = async () => {

// 	console.log(phone)
// 	return {
// 		props: {
// 			logo: logo.items,
// 			phone: phone.items
// 		},
// 		revalidate: Number(process.env.REVALIDATE)
// 	}
// }