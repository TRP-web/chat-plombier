// back-end types

export enum ITimeOfDayList {
   morning = "morning",
   afternoon = "afternoon",
   evening = "evening"
}

export type ITimeOfDay = ITimeOfDayList.afternoon | ITimeOfDayList.morning | ITimeOfDayList.evening

export enum IDayOfWeekList {
   nextMonday = "nextMonday",
   nextTuesday = "nextTuesday",
   nextWednesday = "nextWednesday",
   nextThursday = "nextThursday",
   nextFriday = "nextFriday",
   nextSaturday = "nextSaturday",
   nextSunday = "nextSunday"
}

export type IDayOfWeek =
   IDayOfWeekList.nextMonday |
   IDayOfWeekList.nextTuesday |
   IDayOfWeekList.nextWednesday |
   IDayOfWeekList.nextThursday |
   IDayOfWeekList.nextFriday |
   IDayOfWeekList.nextSaturday |
   IDayOfWeekList.nextSunday

export interface IJobRequest {
   title: string
   description: string
   name?: string
   phoneNumber: string
   email?: string
   address: string
   prise: number
   time: {
      futureDate: string
       dateCreated: Date,
       dayInfo: [IDayOfWeek, ITimeOfDay]
   }
}

export interface IScheduleDay {
   morning: boolean
   afternoon: boolean
   evening: boolean
}
export interface ISchedule {
   nextMonday: IScheduleDay
   nextTuesday: IScheduleDay
   nextWednesday: IScheduleDay
   nextThursday: IScheduleDay
   nextFriday: IScheduleDay
   nextSaturday: IScheduleDay
   nextSunday: IScheduleDay
}
//front-end
export type IDayInfo = IJobRequest["time"]["dayInfo"]


