import Container from "@/components/container"
import { IMainFields } from "@/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "next/image"
import React from "react"

interface IAdvantageProps {
   mainFilds: IMainFields
}

const Advantage: React.FC<IAdvantageProps> = ({ mainFilds }) => {
   const advantage = mainFilds.advantage
   return (
      <>
         <Container>
            <div className="grid grid-rows-2 grid-cols-2 mb-10 max-notebook:grid-rows-1 max-notebook:grid-cols-1">
               <Image
                  src={`https:${advantage[0].fields.image.fields.file.url}`}
                  width={693}
                  height={446}
                  alt="job advantage"
                  className="m-auto"
               />
               <div className="bg-cyanbg-light2 flex justify-center flex-col p-12  max-notebook:row-start-1 max-notebook:p-3">
                  <h3 className="text-4xl font-bold max-monitor1:text-3xl max-tablet:text-2xl">
                     {advantage[0].fields.title}
                  </h3>
                  <div className="text-xl max-monitor1:text-lg">
                     {
                        documentToReactComponents(advantage[0].fields.description)
                     }
                  </div>
               </div>
               <div className="bg-cyanbg-light2 flex justify-center flex-col p-12 max-notebook:p-3">
                  <h3 className="text-4xl font-bold max-monitor1:text-3xl max-tablet:text-2xl">
                     {advantage[0].fields.title}
                  </h3>
                  <div className="text-xl max-monitor1:text-lg">
                     {
                        documentToReactComponents(advantage[0].fields.description)
                     }
                  </div>
               </div>
               <Image
                  src={`https:${advantage[0].fields.image.fields.file.url}`}
                  width={693}
                  height={446}
                  alt="job advantage"
                  className="m-auto"
               />
            </div>
         </Container>
      </>
   )
}
export default Advantage