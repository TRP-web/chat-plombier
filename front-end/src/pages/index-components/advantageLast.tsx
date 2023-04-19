import Container from "@/components/container"
import { IMainFields } from "@/contentful/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Image from "next/image"
import React from "react"

interface IAdvantageLastProps {
   mainFilds: IMainFields
}

const AdvantageLast: React.FC<IAdvantageLastProps> = ({ mainFilds }) => {
   const items = mainFilds.advantage2
   return (
      <div className="mb-14 text-center">
         <h2 className="text-3xl mb-10 max-phone2:text-2xl px-1">Simplifiez vos dépannages et petits travaux</h2>
         <Container>
            <div className="flex justify-between items-center flex-wrap text-lg max-monitor1:justify-center">
               {
                  items.map((item, index) => {
                     const fields = item.fields
                     const url = fields.image.fields.file.url
                     return (
                        <div className="max-w-[325px] w-full bg-cyanbg-light2 pt-[15px] pb-[25px] max-monitor1:mb-2" key={index}>
                           <Image
                              className="mb-4 m-auto"
                              src={`https:${url}`}
                              width={113}
                              height={113}
                              alt="icon of advantage"
                           />
                           <h4 className="font-bold text-center">
                              {fields.title}
                           </h4>
                           <div className="text-center">
                              {
                                 documentToReactComponents(fields.decription)
                              }
                           </div>
                        </div>
                     )
                  })
               }
            </div>
         </Container>
      </div>
   )
}
export default AdvantageLast