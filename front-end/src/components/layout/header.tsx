import React from "react"
import Container from "../container"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const Header: React.FC = () => {

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
         <header className="">
            <Container>
               <div className="header__inner flex items-center justify-between py-5 border-b-[1px] border-cyanbg-dark max-notebook:py-3">
                  <Image alt="logo of the site" src={""} />
                  <div className="flex last:ml-3 items-center max-[660px]:hidden">
                     <nav>
                        <ul className="flex font-bold 
                                    	text-lg items-center max-tablet:text-base">
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
                              <Link
                                 href={"/plombeir"}
                                 className={`text-black hover:text-cyan-light ${isActive("/plombeir")}`}>
                                 plomberie
                              </Link>
                           </li>
                           <li className="uppercase header__item mr-[20px] last:mr-[45px] max-tablet:last:mr-7">
                              <Link
                                 href={""}
                                 className={`text-black hover:text-cyan-light ${isActive("")}`}>
                                 lorem
                              </Link>
                           </li>
                        </ul>
                     </nav>
                     <button className="bg-cyanbg-light rounded-[5px] p-2.5 text-white font-bold max-tablet:p-2">
                        Suivre votre commande
                     </button>
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
            <div className={`mobile-menu min-[661px]:hidden absolute right-[-100%] z-40 bg-white h-screen top-0 w-[65vw] duration-500 shadow-lg shadow-cyan-500/50 mob-${burger}`}>
               <nav>
                  <ul className="flex flex-col items-center mt-2  max-[660px]:text-2xl mb-3">
                     <li
                        className="uppercase py-4 header__item mr-[20px] last:mr-[45px]"
                     >
                        <Link
                           href={"/"}
                           className={`text-black hover:text-cyan-light ${isActive("/")}`}>
                           principale
                        </Link>
                     </li>
                     <li className="uppercase py-4 header__item mr-[20px] last:mr-[45px]">
                        <Link
                           href={"/plombeir"}
                           className={`text-black hover:text-cyan-light ${isActive("/plombeir")}`}>
                           plomberie
                        </Link>
                     </li>
                     <li className="uppercase py-4 header__item mr-[20px] last:mr-[45px] max-tablet:last:mr-7">
                        <Link
                           href={""}
                           className={`text-black hover:text-cyan-light ${isActive("")}`}>
                           lorem
                        </Link>
                     </li>
                  </ul>
               </nav>
               <div className="flex justify-center">
                  <button className="bg-cyanbg-light rounded-[5px] p-2.5 text-white text-xl font-bold max-tablet:p-2">
                     Suivre votre commande
                  </button>
               </div>
            </div>
         </header>
      </>
   )
}
export default Header