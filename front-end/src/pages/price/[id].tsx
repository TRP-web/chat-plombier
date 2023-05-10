import Container from "@/components/container"
import client from "@/contentful"
import { IJobFields, IPriceFields } from "@/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

interface IIdProps {
   jobFields: IJobFields
}

const id: React.FC<IIdProps> = ({ jobFields }) => {
   const url = jobFields ? jobFields.image.fields.file.url : undefined
   const router = useRouter()
   return (
      <>
         <Head>
            <title>Chat Blombier</title>
         </Head>
         <Container>
            <div className="pt-[35px] pb-14 flex max-tablet:flex-col">
               <div className="max-w-[992px] flex-grow-1 mr-[35px] max-tablet:mr-0">
                  <h1 className="text-2xl font-bold mb-5">
                     {jobFields.title}
                  </h1>
                  <div className="rich-text text-xl">
                     {
                        documentToReactComponents(jobFields.description1)
                     }
                  </div>
                  {
                     url ?
                        <Image
                           src={`https:${url}`}
                           width={992}
                           height={444}
                           alt="main image of job"
                        />
                        : null
                  }

                  <div className="rich-text mb-8 text-xl">
                     {
                        documentToReactComponents(jobFields.description1)
                     }
                  </div>
                  <h2 className="bg-cyanbg-light2 flex items-center h-[63px] text-2xl font-bold pl-5 mb-[15px] max-phone2:text-[22px] max-phone2:pl-0 max-phone2:justify-center max-phone2:mb-2">
                     Inclus dans la prestation
                  </h2>
                  <ul className="bg-cyanbg-light2 p-5 mb-[15px]">
                     {
                        jobFields.services.map((elem, index) => {
                           return (
                              <li className="flex mb-[10px] last:mb-0" key={index}>
                                 <Image
                                    src={"/price/is.svg"}
                                    width={24}
                                    height={20}
                                    alt="include job image"
                                    className="mr-[10px]"
                                 />
                                 <span className="text-lg">
                                    {elem}
                                 </span>
                              </li>
                           )
                        })
                     }
                  </ul>
                  <h2 className="bg-cyanbg-light2 flex items-center h-[63px] text-2xl font-bold pl-5 mb-[15px] max-phone2:pl-0 max-phone2:justify-center max-phone2:text-[22px] max-phone2:mb-2">
                     Non inclus dans la prestation
                  </h2>
                  <ul className="bg-cyanbg-light2 p-5 mb-[15px]">
                     {
                        jobFields.isntService.map((elem, index) => {
                           return (
                              <li className="flex mb-[10px] last:mb-0" key={index}>
                                 <Image
                                    src={"/price/isnt.svg"}
                                    width={24}
                                    height={24}
                                    alt="include job image"
                                    className="mr-[10px]"
                                 />
                                 <span className="text-lg">
                                    {elem}
                                 </span>
                              </li>
                           )
                        })
                     }
                  </ul>
               </div>
               <div
                  className="p-5 pb-[25px] bg-[#CFEFF5] self-start flex-shrink-0 max-w-[373px] max-notebook:max-w-[320px] max-tablet:max-w-none max-tablet:w-full max-phone2:p-2"
                  style={{
                     boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
                  }}
               >
                  <h2 className="text-2xl font-bold pb-5 border border-b-[#2F90A4] mb-4 ">
                     Votre devis provisoire
                  </h2>
                  <span className="min-h-[84px] mb-4 block text-xl">
                     {
                        jobFields.title
                     }
                  </span>
                  <strong className="text-5xl mb-4 block">
                     {
                        `${jobFields.prise}.00€`
                     }
                  </strong>
                  <ul className="mb-10">
                     {
                        jobFields.servicePrise.map((elem, index) => {
                           return (
                              <li className="flex mb-[10px] last:mb-0 justify-between" key={index}>
                                 <div className="flex">
                                    <Image
                                       src={"/price/is.svg"}
                                       width={24}
                                       height={20}
                                       alt="include job image"
                                       className="mr-[5px]"
                                    />
                                    <span className="text-lg">
                                       {
                                          elem.fields.value
                                       }
                                    </span>
                                 </div>
                                 <span className="text-lg">
                                    {
                                       `${elem.fields.prise}.00€`
                                    }
                                 </span>
                              </li>
                           )
                        })
                     }
                  </ul>
                  <div className="flex justify-center">
                     <Link
                        href={`/order/${router.query.id}`}
                        className="py-3 px-10 block bg-[#66D0E5] text-white font-bold rounded-[5px] text-xl"
                     >
                        Commander
                     </Link>
                  </div>
               </div>
            </div>
         </Container>
      </>
   )
}
export default id

export const getStaticPaths: GetStaticPaths = async () => {
   const price = await client.getEntries<any>({ //"any" because of that IPrice have promlems with types (duble fields)
      content_type: "price",
   })

   const priceFields: IPriceFields = price.items[0].fields

   return {
      paths: priceFields.jobs.map(elem => {
         return {
            params: {
               id: elem.fields.id
            }
         }
      }),
      fallback: "blocking"
   }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const id = params?.id
   const job = await client.getEntries({
      content_type: "job",
      limit: 1,
      "fields.id": id
   })

   return {
      props: {
         jobFields: job.items[0].fields
      },
      revalidate: Number(process.env.REVALIDATE)
   }
}