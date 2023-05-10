import { GetStaticProps } from "next"
import Head from "next/head"
import React from "react"
import client from "@/contentful"
import { IMain, IMainFields, IPhoneFields } from "@/contentful/contentful"
import { IPhone } from "@/contentful/contentful"
import FormPhone from "@/pages-components/index/formPhone"
import LittleJobs from "@/pages-components/index/littleJobs"
import DepJobs from "@/pages-components/index/depJobs"
import Advantage from "@/pages-components/index/advantage"
import AdvantageLast from "@/pages-components/index/advantageLast"

// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface IHomeProps {
   mainFilds: IMainFields
   phoneFilds: IPhoneFields
}
const Home: React.FC<IHomeProps> = ({ mainFilds, phoneFilds }) => {
   return (
      <>
         <Head>
            <title>Chat Plombier</title>
            <meta name="description" content="Main page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* <link rel="icon" href="/favicon.ico" /> */}
         </Head>
         <div className="flex-col flex-grow">
            <FormPhone mainFields={mainFilds} phoneFields={phoneFilds} />
            <LittleJobs mainFields={mainFilds} />
            <DepJobs mainFields={mainFilds} />
            <Advantage mainFilds={mainFilds} />
            <AdvantageLast mainFilds={mainFilds} />
         </div>
         {/* <Container atributes={{ className: "flex-col flex-grow relative z-10" }}>
         </Container> */}
      </>
   )
}
export default Home

export const getStaticProps: GetStaticProps = async () => {
   const main = await client.getEntries<IMain>({
      content_type: "main"
   })
   const phone = await client.getEntries<IPhone>({
      content_type: "phone"
   })
   return {
      props: {
         mainFilds: main.items[0].fields,
         phoneFilds: phone.items[0].fields
      },
      revalidate: Number(process.env.REVALIDATE)
   }
}