import { GetStaticProps } from "next"
import backEnd, { IUrls } from "../api/back-end"
import Head from "next/head"
import React from "react"
import client from "@/contentful"
import { ITestFild, ITestFildFields } from "@/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Container from "@/components/container"

const Home: React.FC<{ test: string, testFild: ITestFild[] }> = ({ test, testFild }) => {

  const testAxios = async () => {
    const result = await backEnd.get(IUrls.getSchedual)
    console.log(result)
    return result
  }

  React.useEffect(() => {
    console.log(testAxios())
    //cors for back-end
    console.log(testFild)
  }, [])

  return (
    <>
      <Head>
        <title>Chat Plombier</title>
        <meta name="description" content="Main page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Container atributes={{ className: "flex-col flex-grow relative z-10" }}>
        <section className="pt-16 pb-[184px] bg-cyanbg-dark flex justify-center">
          <div className="bg-white">
            <h2>Dépannage ou petits travaux, nous avons la solution !</h2>
          </div>
        </section>
      </Container>
    </>
  )
}
export default Home

// export const getStaticProps: GetStaticProps = async () => {
//   const testFild = await client.getEntries<ITestFildFields>({
//     content_type: "testFild"
//   })
//   console.log(testFild)
//   return {
//     props: {
//       testFild: testFild.items,
//       test: "test stiring"
//     }
//   }
// }