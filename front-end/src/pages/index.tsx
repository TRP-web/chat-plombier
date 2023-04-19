import { GetStaticProps } from "next"
import Head from "next/head"
import React from "react"
import client from "@/contentful"
import { IMain, IMainFields, IPhoneFields } from "@/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import FormPhone from "./index-components/formPhone"
import { IPhone } from "@/contentful/contentful"
import LittleJobs from "./index-components/littleJobs"
import DepJobs from "./index-components/depJobs"
import Advantage from "./index-components/advantage"
import AdvantageLast from "./index-components/advantageLast"

interface IHomeProps {
   mainFilds: IMainFields
   phoneFilds: IPhoneFields
}

const Home: React.FC<IHomeProps> = ({ mainFilds, phoneFilds }) => {
   console.log(mainFilds)
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