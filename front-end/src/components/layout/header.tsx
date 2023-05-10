import React from "react"
import Container from "../container"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { ILogoFields, IPhoneFields } from "@/contentful/contentful"

interface IHeaderProps {
   logoFields: ILogoFields | undefined
   phoneFields: IPhoneFields | undefined
}

const Header: React.FC<IHeaderProps> = ({ logoFields, phoneFields }) => {
   const url = logoFields ? logoFields.logo.fields.file.url : undefined
   const phone = phoneFields?.phone
   const [burger, setBurger] = React.useState<boolean>(false)

   const isActive = (href: string): string => {
      const router = useRouter()
      if (router.asPath === href) {
         return "text-cyan-light"
      }
      return ""
   }

   return (
      <>
         <header className={`${burger ? "overflow-hidden" : ""}`}>
            <Container>
               <div className="header__inner flex items-center justify-between py-3 border-b-[1px] border-cyanbg-dark max-notebook:py-2">
                  <div className="flex items-center">
                     <Link href={"/"} className="max-tablet:max-w-[100px] flex items-center">
                        {
                           url ?
                              <Image
                                 alt="logo of the site"
                                 src={`https:${url}`}
                                 width={150}
                                 height={103}
                              />
                              : null
                        }
                        <span className="text-[#2E6B77] border-b-2 border-cyan-light text-4xl font-bold max-monitor1:hidden">Le Chat De Plombier</span>
                     </Link>

                  </div>


                  <div className="flex last:ml-3 items-center max-[660px]:hidden">
                     <nav>
                        <ul className="flex font-bold 
                                    	text-xl items-center max-tablet:text-base">
                           <li
                              className="uppercase header__item mr-[20px] last:mr-[45px]"
                           >
                              <Link
                                 href={"/"}
                                 className={`text-black hover:text-cyan-light ${isActive("/")}`}>
                                 principale
                              </Link>
                           </li>
                           <li className="uppercase header__item mr-[20px] last:mr-[45px]">
                              {/* <Link
                                 href={"/plombeir"}
                                 className={`text-black hover:text-cyan-light ${isActive("/plombeir")}`}>
                                 plomberie
                              </Link> */}
                           </li>
                           <li className="uppercase header__item mr-[20px] last:mr-[45px] max-tablet:last:mr-7">
                              <Link
                                 href={"/price"}
                                 className={`text-black hover:text-cyan-light ${isActive("/price")}`}>
                                 lorem
                              </Link>
                           </li>
                        </ul>
                     </nav>

                     {/* <button className="bg-cyanbg-light rounded-[5px] p-2.5 text-white font-bold max-tablet:p-2">
                        Suivre votre commande
                     </button> */}
                  </div>
                  <div className="flex items-center">
                     <div className="max-w-[48px] max-notebook:max-w-[30px] max-phone2:max-w-[24px] max-phone1:max-w-[20px]">
                        <Image
                           src={"/phone.png"}
                           width={48}
                           height={48}
                           alt="icon of phone"
                        />
                     </div>

                     <a href={`tel:${phone}`}
                        className="text-3xl text-[#236371] max-monitor1:text-3xl max-phone2:text-2xl max-phone1:text-xl"
                     >
                        {phone}
                     </a>
                  </div>

                  <div
                     className={`min-[661px]:hidden cursor-pointer top-nav relative z-50 ${burger
                        }`}
                     onClick={() => setBurger(!burger)}
                  >
                     <div className="menu-toggle" />
                     <div className="menu-button-container" />
                     <div className="menu-button"></div>
                  </div>

               </div>
               {/* <div className="h-[1px] bg-cyanbg-dark"></div> */}
            </Container>
            <div className={`mobile-menu min-[661px]:hidden absolute right-[-100%] z-40 bg-white h-screen top-0 w-[65vw] max-phone1:w-[70vw] duration-500 shadow-lg shadow-cyan-500/50 mob-${burger}`}>
               <nav>
                  <ul className="flex flex-col items-center mt-4 max-[660px]:text-2xl mb-3">
                     <li
                        className="uppercase py-4 header__item mr-[20px] last:mr-[45px]"
                     >
                        <Link
                           href={"/"}
                           className={`text-black hover:text-cyan-light ${isActive("/")}`}
                           onClick={() => setBurger(false)}
                        >
                           principale
                        </Link>
                     </li>
                     {/* <li className="uppercase py-4 header__item mr-[20px] last:mr-[45px]">
                        <Link
                           href={"/plombeir"}
                           className={`text-black hover:text-cyan-light ${isActive("/plombeir")}`}>
                           plomberie
                        </Link>
                     </li> */}
                     <li className="uppercase py-4 header__item mr-[20px] last:mr-[45px] max-tablet:last:mr-7">
                        <Link
                           href={"/price"}
                           className={`text-black hover:text-cyan-light ${isActive("")}`}
                           onClick={() => setBurger(false)}
                        >
                           lorem
                        </Link>
                     </li>
                  </ul>
               </nav>
               {/* <div className="flex justify-center">
                  <button className="bg-cyanbg-light rounded-[5px] p-2.5 text-white text-xl font-bold max-tablet:p-2">
                     Suivre votre commande
                  </button>
               </div> */}



               <Link href={"/"} className="flex-col items-center justify-center ">
                  {
                     url ?
                        <Image
                           alt="logo of the site"
                           src={`https:${url}`}
                           width={150}
                           height={103}
                           className="m-auto"
                        />
                        : null
                  }
                  <span className="text-[#2E6B77] text-2xl font-bold block px-2 text-center">Le Chat De Plombier</span>
               </Link>
               <div className="flex items-center justify-center mb-5">
                  <div className="max-w-[48px] max-notebook:max-w-[30px] max-phone2:max-w-[24px] max-phone1:max-w-[20px]">
                     <Image
                        src={"/phone.png"}
                        width={48}
                        height={48}
                        alt="icon of phone"
                     />
                  </div>
                  <a href={`tel:${phone}`}
                     className="text-5xl text-[#236371] max-notebook:text-3xl max-phone2:text-2xl max-phone1:text-2xl p-1"
                  >
                     {phone}
                  </a>
               </div>
            </div>
         </header>
      </>
   )
}
export default Header