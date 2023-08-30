import backEnd, { IUrls } from "../api/back-end"
import { IDayInfo, IDayOfWeek, IDayOfWeekList, ISchedule, IScheduleDay, ITimeOfDayList } from "../types/job"
import React from "react"
import PartDay from "./partDay"

export interface IScheduleProps {
   error: boolean
}

type IEnDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday"

const Schedule: React.FC<IScheduleProps> = ({ error }) => {

   const [schedule, setSchedule] = React.useState<ISchedule>()

   const enDays: IEnDays[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
   const frDays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi",]
   const msDay = 1000 * 60 * 60 * 24

   const getDay = (date: Date) => {
      const ofWeek = frDays[date.getDay()]
      const ofMonth = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const result = {
         ofWeek,
         ofMonth
      }
      return result
   }

   const getMonth = (date: Date) => {
      const result = new Intl.DateTimeFormat("fr", { month: "long", }).format(date)
      return result
   }

   const getSchedule = async () => {
      const newSchedule = await backEnd.get<ISchedule>(IUrls.getSchedual)
      setSchedule(newSchedule.data)
   }

   React.useEffect(() => {
      getSchedule()
   }, [])

   const getSchedualArray = () => {
      const date = Number(new Date())
      const result = []
      for (let index = 1; index <= 7; index++) {
         const dateStep = new Date(
            date + (msDay * index)
         )
         const dayStep = enDays[dateStep.getDay()]
         const dayNext = IDayOfWeekList[`next${dayStep}`]
         result.push(dayNext)
      }
      return result
   }
   return (
      <>
         {
            schedule ?
               <div className="">
                  <div className={`flex overflow-x-scrol overflow-y-hidden whitespace-nowrap mb-4 w-[992px] max-[1441px]:w-[57vw] max-notebook:w-[50vw] max-tablet:w-full ${error ? "border-2 border-red-700" : ""
                     }`}>
                     {
                        getSchedualArray().map((elem, index) => {
                           const date = new Date(
                              (Number(new Date()) + msDay * (index + 1))
                           )
                           const day = getDay(date)
                           const month = getMonth(date)
                           return (
                              <div className="w-[184px] flex-shrink-0 border-2 border-cyanbg-dark rounded-[5px] mr-[22px] last:mr-0 mb-[15px]" key={index}>
                                 <div className="bg-[#CFEFF5] flex h-[76px] justify-center items-center flex-col" >
                                    <strong className="first-letter:uppercase block text-xl">
                                       {day.ofWeek}
                                    </strong>
                                    <div className="inline-flex">
                                       <span className="mr-1">{`${day.ofMonth}`}</span>
                                       <span className="block first-letter:uppercase">{` ${month}`}</span>
                                    </div>
                                 </div>
                                 <div className="py-[19px] flex items-center flex-col">
                                    <PartDay
                                       day={IDayOfWeekList[`next${enDays[date.getDay()]}`]}
                                       timeDay={ITimeOfDayList.morning}
                                       schedule={schedule}
                                       date={date}
                                    >
                                       Matin
                                    </PartDay>
                                    <PartDay
                                       day={IDayOfWeekList[`next${enDays[date.getDay()]}`]}
                                       timeDay={ITimeOfDayList.afternoon}
                                       schedule={schedule}
                                       date={date}
                                    >
                                       Après-midi
                                    </PartDay>
                                    <PartDay
                                       day={IDayOfWeekList[`next${enDays[date.getDay()]}`]}
                                       timeDay={ITimeOfDayList.evening}
                                       schedule={schedule}
                                       date={date}
                                    >
                                       Soirée
                                    </PartDay>
                                 </div>
                              </div>

                           )
                        })
                     }
                  </div>
               </div>
               : null
         }
      </>
   )
}
export default Schedule