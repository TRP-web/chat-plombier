import React from "react"
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import backEnd, { IUrls } from "@/src/api/back-end";
import { ICallRequest, IJobRequest, ITimeOfDay, ITimeOfDayList } from "@/src/types/types";
import Schedule from "@/src/pages-components/schedule";
import { IDayInfo } from "@/src/types/job";
interface IIndexProps {
   token: string
   info: any
}

interface IInfo {
   calls: ICallRequest[]
   jobs: IJobRequest[]
}
//0-
export type ITimeContent = {
   time?: IDayInfo
   setTime?: React.Dispatch<React.SetStateAction<IDayInfo | undefined>>
   setFutureDay?: React.Dispatch<React.SetStateAction<string | undefined>>
   futureDay?: string
}
export const TimeContext = React.createContext<ITimeContent>({})
export const useTimeContext = () => React.useContext(TimeContext)



const Index: React.FC<IIndexProps> = () => {
   const [info, setInfo] = React.useState<IInfo>()
   const router = useRouter()
   const getData = React.useCallback(async () => {
      const token = getCookie("token")
      if (token) {
         const info = await backEnd.get<IInfo>(IUrls.info, { headers: { token } })
         setInfo(info.data)
         console.log(info.data)
      } else router.push("/")
   }, [router])

   const deleteCall = async (id: string) => {
      const newCalls = await backEnd.delete<{ requests: ICallRequest[] }>(IUrls.deleteCall, { data: { id } })
      console.log(newCalls)
      setInfo(info => {
         if (!info) {
            return
         }
         const newInfo = { ...info }
         newInfo.calls = newCalls.data.requests
         return newInfo
      })
   }
   const getTransleteTimeOfDay = (time: ITimeOfDay) => {
      if (time === ITimeOfDayList.morning) {
         return "Утром"
      }
      if (time === ITimeOfDayList.afternoon) {
         return "Днем"
      }
      if (time === ITimeOfDayList.evening) {
         return "Вечером"
      }
   }

   const deleteJob = async (id: string) => {
      const newJobs = await backEnd.delete(IUrls.deleteBlock, { data: { id } })
      console.log(newJobs)
      setInfo(info => {
         if (!info) {
            return
         }
         const newInfo = { ...info }
         newInfo.jobs = newJobs.data.requests
         return newInfo
      })
   }
   React.useEffect(() => {
      getData()
   }, [router, getData])
   //----Scheduale
   type IBlocked = IJobRequest["time"]

   const [time, setTime] = React.useState<IDayInfo>()
   const [futureDay, setFutureDay] = React.useState<string>()
   console.log(time)
   const createBlock = async () => {
      try {
         if (!futureDay || !time) return

         const data: IBlocked = {
            dateCreated: new Date(),
            futureDate: futureDay,
            dayInfo: time
         }
         backEnd.post(IUrls.createBlock, data)
      } catch (error) {
         console.log(error)
      }

   }

   return (
      <>
         <div className="max-w-[1400px] m-auto ">
            {
               info ?
                  <>
                     <div className="border border-black mb-5">
                        <h2 className="text-2xl =">Звонки</h2>
                        {
                           info.calls.map((elem, index) => {
                              return (
                                 <div key={index} className="flex border border-blue-500 p-3 justify-between items-center">
                                    <div>
                                       <strong>Номер: </strong>
                                       <span>{elem.phoneNumber}</span>
                                    </div>
                                    <div>
                                       <strong>Имя:</strong>
                                       <span>{elem.name ? elem.name : "Имя не указано"}</span>
                                    </div>
                                    <button
                                       className="cursor-pointer text-xl"
                                       onClick={() => deleteCall(elem._id)}
                                    >Удалить</button>
                                 </div>
                              )
                           })
                        }
                     </div>
                     <div className="border border-black mb-5">
                        <h2 className="text-2xl">Роботы</h2>
                        {
                           info.jobs.map((elem, index) => {
                              return (
                                 <div key={index} className="border border-blue-500 p-3 ">
                                    <div className="mb-3">
                                       <strong>Адрес: </strong>
                                       <span>{elem.address}</span>
                                    </div>
                                    <div className="mb-3">
                                       <strong>Описание: </strong>
                                       <span>{elem.description}</span>
                                    </div>
                                    <div className="mb-3">
                                       <strong>Номер: </strong>
                                       <span>{elem.phoneNumber}</span>
                                    </div>
                                    <div className="mb-3">
                                       <strong>Время: </strong>
                                       <span>Назначиная дата: {elem.time.futureDate} (мес/день/год) {getTransleteTimeOfDay(elem.time.dayInfo[1])}</span>
                                       <span className="block">Дата создания: {String(elem.time.dateCreated)}</span>
                                    </div>
                                    <div className="mb-3">
                                       <strong>Название: </strong>
                                       <span>{elem.title}</span>
                                    </div>
                                    <div className="mb-3">
                                       <strong>Цена: </strong>
                                       <span>{elem.prise}€</span>
                                    </div>
                                    <div className="mb-6">
                                       <strong>Имя:</strong>
                                       <span>{elem.name ? elem.name : "Имя не указано"}</span>
                                    </div>
                                    <button
                                       className="cursor-pointer text-xl"
                                       onClick={() => deleteJob(elem._id)}
                                    >Удалить</button>
                                 </div>
                              )
                           })
                        }
                     </div>
                  </>

                  : null
            }
            <TimeContext.Provider value={{ time, setTime, futureDay, setFutureDay }}>
               <Schedule error={true} />
            </TimeContext.Provider>
            <button
               onClick={createBlock}
               className="text-red-600 font-bold p-3 border border-red-600"
            >
               Заблокировать
            </button>
         </div>
      </>
   )
}
// export const getServerSideProps: GetServerSideProps = async () => {
//    const token = await getCookie("token")
//    console.log(token)
//    const info = await backEnd.get(IUrls.info, { headers: { token } })
//    return {
//       props: {
//          token,
//          info
//       }
//    }
// }
export default Index