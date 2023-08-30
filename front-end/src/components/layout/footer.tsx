import React from "react"
import Container from "../container"
import Image from "next/image"
import Link from "next/link"
import { ILogoFields, IPhoneFields } from "@/contentful/contentful"
interface IFooterProps {
   logoFields: ILogoFields | undefined
   phoneFields: IPhoneFields | undefined
}
const Footer: React.FC<IFooterProps> = ({ logoFields, phoneFields }) => {
   const phone = phoneFields?.phone
   const logoUrl = logoFields?.logo.fields.file.url

   return (
      <>
         <footer className="bg-black min-h-[25px] pt-12 pb-4 max-tablet:pt-6 max-tablet:pb-2">
            <Container>
               <div className="flex items-center justify-between mb-9 max-tablet:flex-col max-tablet:mb-4">
                  <Link href={"/"} className="max-tablet:max-w-[100px] flex items-center">
                     {
                        logoUrl ?
                           <Image
                              alt="logo of the site"
                              src={`https:${logoUrl}`}
                              width={150}
                              height={103}
                           />
                           : null
                     }
                  </Link>
                  <div className="border border-white px-2 py-4  text-white max-w-[305px] max-tablet:mb-2">
                     <span className=" block">Vous êtes un particulier</span>
                     <a href="tel:0170821782" className="flex h-16 mb-1">
                        <span
                           className="flex items-center px-3 bg-white text-black min-w-[130px]"
                        >{phone}</span>
                        <span
                           className="flex items-center px-3 border border-l-0 border-white"
                        >
                           Service gratuit + coût de l'appel
                        </span>
                     </a>
                     <span>du lundi au dimanche de 07h00 à 21h00</span>
                  </div>
                  <nav>
                     <ul
                        className="flex uppercase text-cyan-light text-lg max-notebook:text-base max-tablet:flex-col max-tablet:items-center max-tablet:justify-center"
                     >
                        <li className="mr-6 max-notebook:mr-5 max-tablet:mr-0 max-tablet:p-2">
                           <Link
                              href={"/"}
                           >
                              principale
                           </Link>
                        </li>
                        <li className="max-tablet:p-2 max-tablet:pb-0">
                           <Link
                              href={"/price"}
                           >
                              service
                           </Link>
                        </li>
                     </ul>
                  </nav>
               </div>
               <span className="block text-center text-white">© Le Chat Plombier  2023</span>
            </Container>
         </footer>
      </>
   )
}
export default Footer