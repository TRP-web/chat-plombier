import Container from "@/components/container"
import client from "@/contentful"
import { IPhoneFields, IPrice, IPriceFields } from "@/contentful/contentful"
import Jobs from "@/pages-components/price/jobs"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import React from "react"

interface IIndexProps {
   priceFields: IPriceFields
   phoneFields: IPhoneFields
}

const Index: React.FC<IIndexProps> = ({ priceFields, phoneFields }) => {

   return (
      <>
         <Head>
            <title>Chat Plombier</title>
            <meta name="description" content="Main page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <div className="pt-[35px] pb-[75px]">
            <Container>
               <h1 className="font-bold text-3xl mb-8 max-phone2:text-2xl">
                  {priceFields.title}
               </h1>
               <div className="flex mb-[35px]">
                  <div className="flex items-center flex-col pt-[28px] flex-grow bg-cyanbg-light2 max-monitor1:pb-12">
                     <Image
                        width={146}
                        height={146}
                        src={"/price/price.png"}
                        alt="icon"
                        className="mb-[23px] "
                     />
                     <strong className="text-xl text-center mb-1">
                        Dépannage d'urgence plomberie
                     </strong>
                     <a
                        href={`tel:${phoneFields.phone}`}
                        className="bg-cyanbg-light text-white max-w-[287px] w-full h-14 flex justify-center items-center font-bold text-xl rounded-[5px]"
                     >
                        {phoneFields.phone}
                     </a>
                  </div>
                  <div className="max-monitor1:hidden">
                     <Image
                        src={`https:${priceFields.image.fields.file.url}`}
                        width={967}
                        height={347}
                        alt="main image"
                     />
                  </div>
               </div>
               <div className="text-xl rich-text ">
                  {
                     documentToReactComponents(priceFields.decritpion)
                  }
               </div>
               <h2 className="font-bold text-3xl mb-5 max-phone2:text-2xl">
                  {
                     priceFields.subTitle
                  }
               </h2>
               <Jobs priceFields={priceFields}/>
            </Container>
         </div>
      </>
   )
}
export default Index

export const getStaticProps: GetStaticProps = async () => {
   const price = await client.getEntries<IPrice>({
      content_type: "price"
   })

   const phone = await client.getEntries<IPrice>({
      content_type: "phone"
   })
   return {
      props: {
         priceFields: price.items[0].fields,
         phoneFields: phone.items[0].fields
      },
      revalidate: Number(process.env.REVALIDATE)
   }
}