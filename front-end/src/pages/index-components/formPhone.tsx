import React from "react"
import { IMainFields, IPhoneFields } from "../../contentful/contentful"
import Image from "next/image"
import backEnd, { IUrls } from "@/api/back-end"
interface IFormPhoneProps {
   mainFields: IMainFields,
   phoneFields: IPhoneFields
}

const FormPhone: React.FC<IFormPhoneProps> = ({ mainFields, phoneFields }) => {
   const [name, setName] = React.useState<string>("")
   const [phoneValue, setPhoneValue] = React.useState<string>("")
   const [phoneError, setPhoneError] = React.useState<string>("")

   const phoneValidate = async () => {
      const error = "border border-red-500"
      if (phoneValue.length <= 7) {
         return setPhoneError(error)
      }

      let data: any = { phoneNumber: phoneValue }
      if (name) data.name = name
      try {
         const res = await backEnd.post(IUrls.createCall, data)
         console.log(res.data)
         setPhoneError("")
      } catch (err) {
         console.log(err)
      }

   }

   const url = mainFields.background.fields.file.url
   const phone = phoneFields.phone
   return (
      <>
         <section
            className={"mb-14 max pt-16 pb-[184px] bg-[#379CB8] flex justify-center bg-[length:1600px]  bg-no-repeat bg-center min-h-[620px] max-tablet:pt-10 max-tablet:pb-10 max-tablet:min-h-0 max-tablet:mb-10"}
            style={{
               backgroundImage: `url('http:${url}')`
            }}
         >
            <div className="bg-white max-w-[1016px] w-full px-8 max-tablet:px-4 max-phone2:px-2 pb-9 pt-7 rounded-s ">
               <h2 className="text-[26px] text-center uppercase mb-8 max-phone2:mb-3 max-phone2:text-xl">
                  Dépannage ou petits travaux, nous avons la solution !
               </h2>
               <form
                  action="#"
                  className="mb-9 max-phone2:mb-0"
                  onSubmit={e => e.preventDefault()}
               >
                  <div className="flex justify-between mb-[26px] max-phone2:flex-col max-phone2:mb-3 ">
                     <label
                        htmlFor="name"
                        className="flex max-w-[430px] w-full h-11 mr-3 max-phone2:mb-1.5"
                     >
                        <div
                           className="w-[45px] h-[43px] bg-cyanbg-dark flex justify-center items-center text-white text-lg pr-[1px] rounded-l-[5px]"
                        >
                           1
                        </div>
                        <input
                           className="pl-2.5 bg-[#EEEEEE] block w-full rounded-r-[5px] focus:outline-none text-lg placeholder:text-[#B7B7B7] max-phone2:text-base"
                           type="text"
                           placeholder="Prenom"
                           id="name"
                           value={name}
                           onChange={(e) => { setName(e.target.value) }}
                        />
                     </label>
                     <label
                        htmlFor="phone"
                        className="flex max-w-[430px] w-full"
                     >
                        <div className="w-[45px] h-[43px] bg-cyanbg-dark flex justify-center items-center text-white text-lg pr-[1px] rounded-l-[5px]"
                        >
                           2
                        </div>
                        <input
                           className={`pl-2.5 bg-[#EEEEEE] block w-full rounded-r-[5px] focus:outline-none text-lg placeholder:text-[#B7B7B7] max-phone2:text-base ${phoneError}`}
                           id="phone"
                           placeholder="Nomero"
                           type="number"
                           value={phoneValue}
                           onChange={(e) => { setPhoneValue(e.target.value) }}
                        />
                     </label>
                  </div>
                  <button
                     type="submit"
                     className="block bg-cyanbg-dark w-full h-[43px] text-white text-lg font-bold mb-[13px] rounded-[5px]"
                     onClick={phoneValidate}
                  > C'est parti !</button>
                  <span className="flex justify-center items-center h-[43px] rounded-[5px] border border-cyanbg-dark text-lg max-phone2:text-base ">
                     Ou contactez-nous au {phone}
                  </span>
               </form>
               <div className="flex justify-between max-phone2:hidden">
                  <div className="flex items-center flex-grow ">
                     <div className="max-w-[29px] w-full h-6 relative flex-grow mr-[9px]">
                        <Image
                           alt="check"
                           src={"./main/phone-form.svg"}
                           fill
                        />
                     </div>
                     <span className="max-w-[160px]">
                        Devis gratuit en 2 minutes
                     </span>
                  </div>
                  <div className="flex items-center flex-grow ">
                     <div className="max-w-[29px] w-full h-6 relative flex-grow mr-[9px]">
                        <Image
                           alt="check"
                           src={"./main/phone-form.svg"}
                           fill
                        />
                     </div>
                     <span className="max-w-[160px]">
                        Devis gratuit en 2 minutes
                     </span>
                  </div>
                  <div className="flex items-center flex-grow ">
                     <div className="max-w-[29px] w-full h-6 relative flex-grow mr-[9px]">
                        <Image
                           alt="check"
                           src={"./main/phone-form.svg"}
                           fill
                        />
                     </div>
                     <span className="max-w-[160px]">
                        Devis gratuit en 2 minutes
                     </span>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
export default FormPhone