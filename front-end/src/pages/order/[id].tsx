import Container from "@/components/container"
import client from "@/contentful"
import { IJobFields, IPriceFields } from "@/contentful/contentful"
import { IDayInfo, IJobRequest } from "@/types/job"
import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import backEnd, { IUrls } from "@/api/back-end"
import Schedule from "@/pages-components/order/schedule"
interface IIdProps {
   jobFields: IJobFields
}
export type ITimeContent = {
   time?: IDayInfo
   setTime?: React.Dispatch<React.SetStateAction<IDayInfo | undefined>>
   setFutureDay?: React.Dispatch<React.SetStateAction<string | undefined>>
   futureDay?: string
}

interface IFormPart {
   value: string
   error: string
}

export const TimeContext = React.createContext<ITimeContent>({})
export const useTimeContext = () => React.useContext(TimeContext)

const id: React.FC<IIdProps> = ({ jobFields }) => {
   const router = useRouter()
   const [time, setTime] = React.useState<IDayInfo>()
   const [futureDay, setFutureDay] = React.useState<string>()
   const [timeError, setTimeError] = React.useState<string>("")
   const [description, setDescription] = React.useState<IFormPart>({ value: "", error: "" })
   const [address, setAddress] = React.useState<IFormPart>({ value: "", error: "" })
   const [phoneNumber, setPhoneNumber] = React.useState<IFormPart>({ value: "", error: "" })
   const [name, setName] = React.useState<IFormPart>({ value: "", error: "" })
   const [lastName, setLastName] = React.useState<IFormPart>({ value: "", error: "" })
   const [email, setEmail] = React.useState<IFormPart>({ value: "", error: "" })


   const ValueValidate = () => {
      if (!time && !futureDay) {
         setTimeError("time is required")
         return false
      }
      if (!description.value) {
         setDescription((value) => {
            const newValue = { ...value }
            newValue.error = "description is required"

            return newValue
         })
         return false
      }
      if (!address.value) {
         setAddress((value) => {
            const newValue = { ...value }
            newValue.error = "address is required"

            return newValue
         })
         return false
      }
      if (!phoneNumber.value) {
         setPhoneNumber((value) => {
            const newValue = { ...value }
            newValue.error = "phone is required"

            return newValue
         })
         return false
      }
      return true
   }

   const cancelAllErrors = () => {
      const cancelError = (value: IFormPart) => {
         const newValue = { ...value }
         newValue.error = ""
         return newValue
      }
      setTimeError("")
      setDescription(cancelError)
      setAddress(cancelError)
      setPhoneNumber(cancelError)
      setName(cancelError)
      setLastName(cancelError)
      setEmail(cancelError)
   }

   const formSumbit = async () => {
      // сделать подсветку графика
      const futureDate = new Intl.DateTimeFormat("en",
         { day: "numeric", month: "numeric", year: "numeric" }
      ).format(new Date())
      cancelAllErrors()
      try {
         if (!ValueValidate()) return

         const data: IJobRequest = {
            description: description.value,
            address: address.value,
            phoneNumber: phoneNumber.value,
            prise: jobFields.prise,
            title: jobFields.title,
            time: {
               futureDate: futureDay!,
               dateCreated: new Date(),
               dayInfo: time!
            }
         }

         const job = await backEnd.post<IJobRequest>(IUrls.createJob, data)
         router.push("/")

      } catch (error) {
         console.log(error)
      }
   }
   const classError = (value: IFormPart) => {
      if (value.error) {
         return "border-red-700"
      } else return ""
   }
   return (
      <>
         <Head>
            <title>Chat Plombier</title>
            <meta name="description" content="Main page" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
         </Head>
         <Container>
            <div className="pt-[35px] pb-14 flex max-tablet:flex-col justify-between relative">
               <div className="max-w-[992px] flex-grow-1 flex-shrink mr-[35px] max-tablet:mr-0">
                  <h1 className="font-bold text-3xl mb-5">Choisissez votre créneau d'intervention</h1>
                  <h2 className="mb-5 block text-xl font-bold">
                     Sélectionnez vos préférences de rendez-vous
                  </h2>
                  <p className="text-xl mb-8">
                     Vos préférences seront communiquées au dépanneur qui vous rappelera afin de fixer le rendez-vous
                     Nos horaires d'intervention : matin 8h-13h , après-midi 13h-19h , soirée 19h-8h
                  </p>
                  <TimeContext.Provider value={{ time, setTime, futureDay, setFutureDay }}>
                     <Schedule error={Boolean(timeError)} />
                  </TimeContext.Provider>
                  <span
                     className="text-center block mb-8"
                  >Faire défiler pour voir plus d'horaires</span>
                  <h2 className="mb-2 block text-xl font-bold">
                     Laissez un message au professionnel pour facilier votre dépannage (facultatif)
                  </h2>
                  <form action="#">
                     <textarea
                        name="decription"
                        id="description"
                        className={`block w-full border-2 border-cyanbg-dark min-h-[207px] pt-5 pl-[10px] rounded-[5px] mb-5 ${classError(description)}`}
                        placeholder="Précisions sur votre dépannage"
                        value={description.value}
                        onChange={(e) => setDescription(value => {
                           const newValue = { ...value }
                           newValue.value = e.target.value
                           return newValue
                        })}
                     ></textarea>
                     <h2 className="mb-3 block text-xl font-bold">
                        Renseignez vos informations personnelles
                     </h2>
                     <div className="mb-5">
                        <label>Adresse email</label>
                        <input
                           type="text"
                           className="min-h-[48px] block w-full border-2 border-cyanbg-dark rounded-[5px] pl-2"
                           name="email"
                           value={email.value}
                           onChange={(e) => setEmail(value => {
                              const newValue = { ...value }
                              newValue.value = e.target.value
                              return newValue
                           })}
                        />
                     </div>
                     <div className="flex mb-5">
                        <div className="flex-grow mr-4">
                           <label>Nom :</label>
                           <input
                              type="text"
                              className="min-h-[48px] block w-full border-2 border-cyanbg-dark rounded-[5px] pl-2"
                              value={name.value}
                              onChange={(e) => setName(value => {
                                 const newValue = { ...value }
                                 newValue.value = e.target.value
                                 return newValue
                              })}
                           />
                        </div>
                        <div className="flex-grow">
                           <label>Prénom :</label>
                           <input
                              type="text"
                              className="min-h-[48px] block w-full border-2 border-cyanbg-dark rounded-[5px] pl-2"
                              value={lastName.value}
                              onChange={(e) => setLastName(value => {
                                 const newValue = { ...value }
                                 newValue.value = e.target.value
                                 return newValue
                              })}
                           />

                        </div>
                     </div>
                     <div className="mb-5">
                        <label>Adresse :</label>
                        <input
                           type="text"
                           className={`min-h-[48px] block w-full border-2 border-cyanbg-dark rounded-[5px] pl-2 ${classError(address)}`}
                           name="address"
                           value={address.value}
                           onChange={(e) => setAddress(value => {
                              const newValue = { ...value }
                              newValue.value = e.target.value
                              return newValue
                           })}
                        />
                     </div>

                     <label>Téléphone :</label>
                     <input
                        type="number"
                        className={`min-h-[48px] block w-full border-2 border-cyanbg-dark rounded-[5px] pl-2 ${classError(phoneNumber)}`}
                        name="address"
                        value={phoneNumber.value}
                        onChange={(e) => setPhoneNumber(value => {
                           const newValue = { ...value }
                           newValue.value = e.target.value
                           return newValue
                        })}
                     />
                  </form>
               </div>
               <div
                  className={`p-5 pb-[25px] bg-[#CFEFF5] flex-shrink-0 max-w-[373px] max-notebook:max-w-[320px] max-tablet:max-w-none max-tablet:w-full max-phone2:p-2 self-start sticky top-5`}
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
                     <div
                        // href={`/order/${router.query.id}`}
                        onClick={formSumbit}
                        className="py-3 px-10 block bg-[#66D0E5] text-white font-bold rounded-[5px] text-xl text-center cursor-pointer"
                     >
                        Valider mes informations
                     </div>
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