import { IPriceFields } from "@/contentful/contentful"
import Link from "next/link"
import React from "react"

interface IJobsProps {
   priceFields: IPriceFields
}

const Jobs: React.FC<IJobsProps> = ({ priceFields }) => {
   const jobs = priceFields.jobs
   return (
      <>
         <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[minmax(60px,_auto)] items-center text-[#B7B7B7] max-tablet:grid-cols-[4fr_0.8fr_1fr] max-phone1:grid-cols-[4fr_1fr_0fr]"> {/*minmax(50%,_2fr)*/}
            <span className="w-full">Prestation</span>
            <span className="w-full">Prix de base</span>
            <span className="w-full max-phone1:hidden">Durée</span>
         </div>
         {
            jobs.map((job, index) => {
               const fields = job.fields
               return (
                  <div
                     className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[minmax(60px,_auto)] items-center hover:bg-cyanbg-light2 max-tablet:grid-cols-[4fr_0.8fr_1fr] max-phone1:grid-cols-[4fr_1fr_0fr] border-b border-b-cyanbg-dark"
                     key={index}>
                     <Link className="w-full text-cyanbg-dark underline" href={`price/${fields.id}`}>{fields.title}</Link>
                     <span className="w-full">{fields.prise}€</span>
                     <span className="w-full max-phone1:hidden">{fields.time}</span>
                  </div >
               )
            })
         }
      </>
   )
}
export default Jobs