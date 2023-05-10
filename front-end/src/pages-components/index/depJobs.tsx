import Container from "@/components/container"
import { IMainFields } from "@/contentful/contentful"
import React from "react"
import Job from "./job"

interface IDepJobsProps {
   mainFields: IMainFields
}

const DepJobs: React.FC<IDepJobsProps> = ({mainFields}) => {
   const jobs = mainFields.topsDpannages1
   return (
      <>
         <Container>
            <section className="mb-28 max-notebook:mb-10">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex-grow h-[2px] bg-cyanbg-dark"></div>
                  <h2 className="mx-8 text-2xl">Tops dépannages</h2>
                  <div className="flex-grow h-[2px] bg-cyanbg-dark"></div>
               </div>
               <div className="flex justify-between max-notebook:flex-col max-notebook:items-center max-w-[1200px] m-auto">
                  {jobs.map((elem, index) => {
                     return (
                        <Job item={elem} key={index} />
                     )
                  })}
               </div>
            </section>
         </Container>
      </>
   )
}
export default DepJobs