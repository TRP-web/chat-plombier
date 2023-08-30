import React from "react"
import { IDayOfWeek, ISchedule, ITimeOfDay } from "../types/job"
import { useTimeContext, } from "../pages/data/index"

interface IPartDayProps {
   day: IDayOfWeek
   timeDay: ITimeOfDay
   schedule: ISchedule
   children: string
   date: Date
}

const PartDay: React.FC<IPartDayProps> = ({ children, day, timeDay, schedule, date }) => {
   const { time, setTime, futureDay, setFutureDay } = useTimeContext()
   const scheduleStatus = schedule[day][timeDay]
   const getStatus = () => {
      if (scheduleStatus) {
         return "border-2 border-[#A4362F] bg-[#F2D2D2]" // is busy
      }
      if (!time) {
         return "border-2 border-cyanbg-dark"
      }

      if (time[0] === day && time[1] === timeDay) {
         return "border-2 bg-[#B7EBF4] border-cyanbg-dark" // is decided
      }
      return "border-2 border-cyanbg-dark"
   }

   const decideHandler = () => {
      if (!setTime || !setFutureDay) return
      const futureDate = new Intl.DateTimeFormat("en",
         { day: "numeric", month: "numeric", year: "numeric" }
      ).format(date)
      console.log(futureDate)
      if (!scheduleStatus) {
         setTime([day, timeDay])

         setFutureDay(futureDate)
      }
   }

   return (
      setTime ?
         <div
            className={`max-w-[142px] w-full m-auto  mb-[15px] last:mb-0 py-[5px] rounded-[20px] text-center text-lg cursor-pointer ${getStatus()} duration-300`}
            onClick={decideHandler}
         >
            {
               children
            }
         </div>
         : null
   )
}
export default PartDay