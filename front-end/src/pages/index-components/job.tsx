import { ITopsPetitsTravaux } from "@/contentful/contentful"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface IJobProps {
   item: ITopsPetitsTravaux
}

const Job: React.FC<IJobProps> = ({ item }) => {
   const fields = item.fields
   return (
      <>
         <div className="relative max-w-[354px] w-full rounded-[5px] overflow-hidden block-shadow mr-3 last:mr-0 max-notebook:mr-0 max-notebook:mb-3 ">
            <Image
               src={`https:${fields.image.fields.file.url}`}
               alt="top littel types of jobs"
               width={354}
               height={298}
               className="mb-[30px] max-notebook:mb-3"
            />
            <div className="p-6 max-notebook:p-3">
               <p className="text-lg min-h-[90px] mb-4 max-notebook:min-h-[80px] max-notebook:mb-2">
                  {fields.description}
               </p>
               <Link href={fields.idJob} className="flex justify-center items-center text-white max-w-[300px] w-full bg-cyanbg-dark h-14 m-auto">
                  {fields.buttonText}
               </Link>
            </div>
         </div>
      </>
   )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//    const main: any = await client.getEntries({
//       content_type: "main",
//    })

//    const mainFields: IMainFields = main.filds

//    const fieldsArray = [...mainFields.topPetits, ...mainFields.topsDpannages1]

//    return {
//       paths: fieldsArray.map(elem => {
//          return {
//             params: {
//                id: elem.fields.idJob
//             }
//          }
//       }),
//       fallback: "blocking"
//    }
// }

// export const getStaticProps: GetStaticProps = async ({params}) => {

export default Job